import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://risk:risk@db:5432/riskdb")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
STORAGE_DIR = os.getenv("STORAGE_DIR", "storage")
