from typing import Optional

from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models.document import Document
from app.models.job import Job
from app.models.chunk import Chunk
from app.models.clause import Clause
from app.models.risk import Risk
from app.models.action_item import ActionItem

from app.services.extract_text import extract_text_from_pdf
from app.services.chunking import chunk_text
from app.services.clauses import extract_clauses
from app.services.heuristics import analyze_clauses
from app.services.risks import extract_risks

from app.tasks.celery_app import celery


@celery.task(name="app.tasks.pipeline.process_document")
def process_document(document_id: int, job_id: Optional[int] = None):
    db: Session = SessionLocal()
    job: Optional[Job] = None
    try:
        doc = db.get(Document, document_id)
        if not doc:
            if job_id is not None:
                job = db.get(Job, job_id)
                if job:
                    job.status = "failed"
                    job.error = "document not found"
                    db.commit()
            return {"ok": False, "error": "document not found"}

        if job_id is not None:
            job = db.get(Job, job_id)
            if not job:
                doc.status = "failed"
                db.commit()
                return {"ok": False, "error": "job not found"}
            if job.document_id != document_id:
                doc.status = "failed"
                job.status = "failed"
                job.error = "job/document mismatch"
                db.commit()
                return {"ok": False, "error": "job/document mismatch"}
        else:
            job = Job(document_id=document_id, status="processing")
            db.add(job)
            db.commit()
            db.refresh(job)

        doc.status = "processing"
        job.status = "processing"
        job.error = None
        db.commit()

        text = extract_text_from_pdf(doc.storage_path)

        # 1) chunks
        pieces = chunk_text(text)
        db.query(Chunk).filter(Chunk.document_id == document_id).delete()
        for i, t in enumerate(pieces):
            db.add(Chunk(document_id=document_id, idx=i, text=t))

        # 2) clauses (from full text for now)
        clauses = extract_clauses(text)
        db.query(Clause).filter(Clause.document_id == document_id).delete()
        for i, c in enumerate(clauses):
            db.add(Clause(document_id=document_id, idx=i, text=c))

        # 3) analysis (risks + actions)
        analysis = analyze_clauses(clauses)
        risk_rows = extract_risks(clauses)
        action_rows = analysis["actions"]

        # 4) store risks
        db.query(Risk).filter(Risk.document_id == document_id).delete()
        for r in risk_rows:
            db.add(
                Risk(
                    document_id=document_id,
                    severity=r["severity"],
                    summary=r["summary"],
                    clause_text=r["clause_text"],
                )
            )

        # 5) store actions
        db.query(ActionItem).filter(ActionItem.document_id == document_id).delete()
        for a in action_rows:
            db.add(
                ActionItem(
                    document_id=document_id,
                    priority=a["priority"],
                    title=a["title"],
                    why=a["why"],
                    clause_text=a["clause_text"],
                )
            )

        doc.status = "done"
        job.status = "done"
        db.commit()

        return {
            "ok": True,
            "job_id": job.id,
            "chunks": len(pieces),
            "clauses": len(clauses),
            "risks": len(risk_rows),
            "actions": len(action_rows),
        }

    except Exception as e:
        doc = db.get(Document, document_id)
        if doc:
            doc.status = "failed"

        if job_id is not None:
            job = db.get(Job, job_id)
        if job:
            job.status = "failed"
            job.error = str(e)

        db.commit()
        return {"ok": False, "error": str(e)}

    finally:
        db.close()
