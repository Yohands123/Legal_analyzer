from sqlalchemy import ForeignKey, Text, String
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Risk(Base):
    __tablename__ = "risks"

    id: Mapped[int] = mapped_column(primary_key=True)
    document_id: Mapped[int] = mapped_column(ForeignKey("documents.id", ondelete="CASCADE"))
    severity: Mapped[str] = mapped_column(String(20), default="medium")  # low|medium|high
    summary: Mapped[str] = mapped_column(Text)
    clause_text: Mapped[str] = mapped_column(Text)
