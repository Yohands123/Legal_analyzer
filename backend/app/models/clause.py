from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Clause(Base):
    __tablename__ = "clauses"

    id: Mapped[int] = mapped_column(primary_key=True)
    document_id: Mapped[int] = mapped_column(ForeignKey("documents.id", ondelete="CASCADE"))
    idx: Mapped[int] = mapped_column()
    text: Mapped[str] = mapped_column(Text)
