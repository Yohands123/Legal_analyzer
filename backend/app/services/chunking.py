from typing import List

def chunk_text(text: str, max_chars: int = 1200) -> List[str]:
    text = text.strip()
    if not text:
        return []

    chunks = []
    i = 0
    n = len(text)

    while i < n:
        j = min(i + max_chars, n)
        cut = text.rfind("\n", i, j)
        if cut != -1 and cut > i + 200:
            j = cut
        chunks.append(text[i:j].strip())
        i = j

    return [c for c in chunks if c]
