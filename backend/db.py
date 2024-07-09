from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from alembic import command
from alembic.config import Config



dsn = 'sqlite:///./sql_app.db'

engine = create_engine(
    dsn, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)
metadata = MetaData()


def drop_all_tables():
    metadata.reflect(bind=engine)
    metadata.drop_all(bind=engine)

def run_alembic_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

