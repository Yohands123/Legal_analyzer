from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.document import Document
from app.models.job import Job
from app.models.risk import Risk
from app.models.action_item import ActionItem

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Not found")

    return {
        "id": job.id,
        "document_id": job.document_id,
        "status": job.status,
        "error": job.error,
    }


@router.get("/{job_id}/results")
def get_results(job_id: int, db: Session = Depends(get_db)):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Not found")

    doc = db.get(Document, job.document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    risks = db.query(Risk).filter(Risk.document_id == doc.id).all()
    actions = db.query(ActionItem).filter(ActionItem.document_id == doc.id).all()

    return {
        "job_id": job.id,
        "document_id": doc.id,
        "status": job.status,
        "filename": doc.filename,
        "risks": [
            {"severity": r.severity, "summary": r.summary, "clause_text": r.clause_text}
            for r in risks
        ],
        "actions": [
            {
                "priority": a.priority,
                "title": a.title,
                "why": a.why,
                "clause_text": a.clause_text,
            }
            for a in actions
        ],
    }
