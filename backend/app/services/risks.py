import os
from typing import List, Dict

RISK_KEYWORDS = [
    ("we may", "medium"),
    ("at our discretion", "high"),
    ("without notice", "high"),
    ("terminate", "medium"),
    ("suspend", "medium"),
    ("no liability", "high"),
    ("not responsible", "high"),
    ("share", "medium"),
    ("third party", "medium"),
    ("arbitration", "medium"),
    ("waive", "high"),
    ("indemnify", "high"),
]

def _heuristic_extract_risks(clauses: List[str]) -> List[Dict]:
    out = []
    for c in clauses:
        lower = c.lower()
        hits = [(k, sev) for (k, sev) in RISK_KEYWORDS if k in lower]
        if hits:
            # pick highest severity among hits
            severity = "low"
            if any(sev == "high" for _, sev in hits):
                severity = "high"
            elif any(sev == "medium" for _, sev in hits):
                severity = "medium"

            summary = f"Potential risk: clause contains {', '.join([k for k,_ in hits])}"
            out.append({"severity": severity, "summary": summary, "clause_text": c})
    return out


def extract_risks(clauses: List[str]) -> List[Dict]:
    provider = os.getenv("LLM_PROVIDER", "heuristic").lower()
    if provider == "openai":
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is not set")
        from app.llm.openai import ChatGPTClient
        return ChatGPTClient(api_key=api_key).extract_risks(clauses)

    return _heuristic_extract_risks(clauses)
