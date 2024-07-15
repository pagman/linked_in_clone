pip install alembic 		
pip install SQLAlchemy
pip install fastapi
pip install "uvicorn[standard]"

add a column 

alembic stamp head
alembic revision --autogenerate -m "message"
alembic upgrade head
uvicorn main:app --reload
