import re
from typing import List

def extract_clauses(text: str) -> List[str]:
    # super simple: split on bullet-like patterns / numbered lines / long sentences
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    clauses = []
    buf = []

    for line in lines:
        if re.match(r"^(\d+\.|\(\w\)|•|-)\s+", line):
            if buf:
                clauses.append(" ".join(buf).strip())
                buf = []
            clauses.append(line)
        else:
            buf.append(line)
            if len(" ".join(buf)) > 400:
                clauses.append(" ".join(buf).strip())
                buf = []

    if buf:
        clauses.append(" ".join(buf).strip())

    return [c for c in clauses if len(c) > 20]
