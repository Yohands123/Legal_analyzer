from fastapi import FastAPI
from app.api.router import router as api_router

app = FastAPI(title="Legal Analyzer API")

@app.get("/health")
def health():
    return {"ok": True}

app.include_router(api_router, prefix="/api")
