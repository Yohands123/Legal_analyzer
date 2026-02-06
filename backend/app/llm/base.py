from abc import ABC, abstractmethod
from typing import List, Dict


class LLMClient(ABC):
    @abstractmethod
    def extract_risks(self, clauses: List[str]) -> List[Dict]:
        pass

    @abstractmethod
    def summarize_document(self, text: str) -> str:
        pass
