import os
from app.llm.openai import ChatGPTClient

def get_llm():
    provider = os.getenv("LLM_PROVIDER", "heuristic").lower()

    if provider == "openai":
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is not set")
        return ChatGPTClient(api_key=api_key)

    raise ValueError(f"Unknown LLM provider: {provider}")
