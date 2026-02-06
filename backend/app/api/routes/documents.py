from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.document import Document
from app.models.job import Job
from app.models.chunk import Chunk
from app.models.clause import Clause
from app.models.risk import Risk
from app.services.storage import save_upload
from app.tasks.pipeline import process_document

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing filename")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF supported right now")

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty file")

    original_name, path = save_upload(file.filename, data)

    # store relative-ish path (works inside container)
    doc = Document(filename=original_name, storage_path=path, status="queued")
    db.add(doc)
    db.commit()
    db.refresh(doc)

    job = Job(document_id=doc.id, status="queued")
    db.add(job)
    db.commit()
    db.refresh(job)

    process_document.delay(doc.id, job.id)

    return {
        "ok": True,
        "document_id": doc.id,
        "job_id": job.id,
        "status": job.status,
        "poll": f"/jobs/{job.id}",
        "results": f"/jobs/{job.id}/results",
    }


@router.get("/{doc_id}")
def get_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.get(Document, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return {"id": doc.id, "filename": doc.filename, "status": doc.status}


@router.get("/{doc_id}/chunks")
def get_chunks(doc_id: int, db: Session = Depends(get_db)):
    rows = (
        db.query(Chunk)
        .filter(Chunk.document_id == doc_id)
        .order_by(Chunk.idx.asc())
        .all()
    )
    return [{"idx": r.idx, "text": r.text} for r in rows]


@router.get("/{doc_id}/clauses")
def get_clauses(doc_id: int, db: Session = Depends(get_db)):
    rows = (
        db.query(Clause)
        .filter(Clause.document_id == doc_id)
        .order_by(Clause.idx.asc())
        .all()
    )
    return [{"idx": r.idx, "text": r.text} for r in rows]


@router.get("/{doc_id}/risks")
def get_risks(doc_id: int, db: Session = Depends(get_db)):
    rows = db.query(Risk).filter(Risk.document_id == doc_id).all()
    return [
        {"severity": r.severity, "summary": r.summary, "clause_text": r.clause_text}
        for r in rows
    ]
