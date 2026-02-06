from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(primary_key=True)
    filename: Mapped[str] = mapped_column(String(300))
    storage_path: Mapped[str] = mapped_column(String(600))
    status: Mapped[str] = mapped_column(String(50), default="queued")  # queued|processing|done|failed
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
