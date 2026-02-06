import os
from celery import Celery

broker_url = os.getenv("CELERY_BROKER_URL") or os.getenv("REDIS_URL", "redis://redis:6379/0")
result_backend = os.getenv("CELERY_RESULT_BACKEND") or os.getenv(
    "REDIS_URL", "redis://redis:6379/0"
)

celery = Celery(
    "legal_backend",
    broker=broker_url,
    backend=result_backend,
    include=["app.tasks.pipeline"],
)

celery.conf.update(
    task_track_started=True,
    broker_connection_retry_on_startup=True,
)
