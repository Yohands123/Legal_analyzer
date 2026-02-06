from typing import List, Dict

HIGH = {"terminate", "liability", "indemn", "arbitration", "waive", "privacy", "data"}
MED  = {"auto-renew", "subscription", "fees", "share", "third-party", "jurisdiction"}


def analyze_clauses(clauses: List[str]) -> Dict:
    actions = []
    for c in clauses:
        lc = c.lower()

        if any(k in lc for k in {"auto-renew", "automatic renewal", "renews automatically"}):
            actions.append({
                "priority": "medium",
                "title": "Check auto-renewal / cancellation terms",
                "why": "Auto-renewal can cause unexpected charges if cancellation windows are strict.",
                "clause_text": c
            })

        if any(k in lc for k in {"arbitration", "class action waiver", "waive class"}):
            actions.append({
                "priority": "high",
                "title": "Review arbitration / class-action waiver",
                "why": "This can limit legal options and how disputes can be handled.",
                "clause_text": c
            })

        if any(k in lc for k in {"share your data", "third parties", "affiliates"}):
            actions.append({
                "priority": "medium",
                "title": "Review data-sharing with third parties",
                "why": "May affect privacy and where your information goes.",
                "clause_text": c
            })

    # de-dupe by (title + clause_text)
    seen = set()
    deduped = []
    for a in actions:
        key = (a["title"], a["clause_text"])
        if key not in seen:
            seen.add(key)
            deduped.append(a)

    return {"actions": deduped}
