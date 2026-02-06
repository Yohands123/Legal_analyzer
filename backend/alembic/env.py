from alembic import context
from sqlalchemy import engine_from_config, pool
import os
import sys
from pathlib import Path

# Ensure /app is on PYTHONPATH so "import app" works inside Docker
sys.path.append(str(Path(__file__).resolve().parents[1]))
from app.models.base import Base
import app.models  # ensures metadata is populated

config = context.config
target_metadata = Base.metadata

def get_url():
    return os.environ.get("DATABASE_URL", config.get_main_option("sqlalchemy.url"))

def run_migrations_offline():
    context.configure(
        url=get_url(),
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    cfg = config.get_section(config.config_ini_section)
    cfg["sqlalchemy.url"] = get_url()

    connectable = engine_from_config(
        cfg,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
