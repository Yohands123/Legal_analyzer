from pathlib import Path
from uuid import uuid4

from app.core.config import STORAGE_DIR as STORAGE_DIR_STR

STORAGE_DIR = Path(STORAGE_DIR_STR)


def ensure_storage_dir() -> Path:
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    return STORAGE_DIR


def save_upload(filename: str, data: bytes) -> tuple[str, str]:
    """
    Returns: (safe_filename, storage_path)
    - safe_filename: what we store as display name
    - storage_path: path on disk used by pipeline
    """
    ensure_storage_dir()

    original = Path(filename).name  # strips any path traversal
    ext = Path(original).suffix.lower() or ".pdf"
    safe_name = f"{uuid4().hex}{ext}"

    out_path = STORAGE_DIR / safe_name
    out_path.write_bytes(data)

    return original, str(out_path)
