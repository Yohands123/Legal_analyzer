import json
from typing import List, Dict

from app.llm.base import LLMClient


class ChatGPTClient(LLMClient):
    def __init__(self, api_key: str):
        from openai import OpenAI

        self.client = OpenAI(api_key=api_key)

    def extract_risks(self, clauses: List[str]) -> List[Dict]:
        prompt = (
            "You are a legal risk analyzer.\n"
            "Given the following clauses, identify legal risks.\n"
            "Return JSON ONLY as an array of objects with fields:\n"
            "- severity (low|medium|high)\n"
            "- summary\n"
            "- clause_text\n\n"
            f"Clauses JSON:\n{json.dumps(clauses)}\n"
        )

        resp = self.client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )

        raw = resp.choices[0].message.content.strip()
        data = json.loads(raw)
        if not isinstance(data, list):
            raise ValueError("Expected a JSON array of risk objects")
        return data

    def summarize_document(self, text: str) -> str:
        resp = self.client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "Summarize this legal document in plain English."},
                {"role": "user", "content": text},
            ],
        )
        return resp.choices[0].message.content
