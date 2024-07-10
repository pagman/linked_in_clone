pip install alembic 		
pip install SQLAlchemy
pip install fastapi
pip install "uvicorn[standard]"

add a column 
alembic upgrade head
alembic revision --autogenerate -m "message"
uvicorn main:app --reload
