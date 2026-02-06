from fastapi import APIRouter

from app.api.routes import documents, jobs

router = APIRouter()

# document upload + status + chunks/clauses/risks
router.include_router(documents.router)

# analysis results / jobs
router.include_router(jobs.router)
