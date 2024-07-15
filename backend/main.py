from fastapi import FastAPI, Depends, Request, Header, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import schema
import errors
from typing import List
from db import get_db, drop_all_tables, run_alembic_migrations
import logic
from wrapper import Wrapper

origins = ["http://localhost:3000"]
app = FastAPI()
app.router.route_class = Wrapper

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.exception_handler(errors.JsonException)
async def unicorn_exception_handler(
    request: Request, exc: errors.JsonException
):
    return JSONResponse(
        status_code=exc.code,
        content={
            "message": exc.message,
            "detail": exc.details,
            "data": exc.data,
        },
    )


@app.get("/users/", response_model=list[schema.User])
def get_users(db: Session = Depends(get_db), token: str = Header(None)):
    return logic.get_users(db, token)


@app.post("/users/", response_model=schema.User)
def create_user(body: schema.UserCreate, db: Session = Depends(get_db)):
    return logic.create_user(db, body)


# @app.put("/admin/validate-user/", response_model=schema.User)
# def validate_user(
#     body: schema.UserId, db: Session = Depends(get_db),
#     token: str = Header(None)
# ):
#     return logic.validate_user(db, body.user_id, token)


@app.post("/login/", response_model=schema.LoginToken)
def login(
    body: schema.LoginCredentials, db: Session = Depends(get_db),
):
    return logic.login(db, body)


@app.get("/posts/", response_model=List[schema.Post])
def get_posts(
    db: Session = Depends(get_db), token: str = Header(None),
    query_params: schema.ItemQueryParams = Depends()
):
    return logic.get_posts(db, token, query_params)


@app.post("/create-post/", response_model=schema.Post)
def create_post(
    body: schema.PostCreate, db: Session = Depends(get_db),
    token: str = Header(None)
):
    return logic.create_post(db, body, token)


# @app.post("/modify-post/", response_model=schema.Post)
# def modify_post(
#     body: schema.ModifyPost, db: Session = Depends(get_db),
#     token: str = Header(None)
# ):
#     return logic.modify_post(db, body, token)


# @app.post('/bid/', response_model=schema.Bid)
# def submit_bid(
#     body: schema.SubmitBid, db: Session = Depends(get_db),
#     token: str = Header(None)
# ):
#     return logic.submit_bid(db, body, token)


@app.post('/message/', response_model=schema.Message)
def send_message(
    body: schema.SendMessage, db: Session = Depends(get_db),
    token: str = Header(None)
):
    return logic.send_message(db, body, token)


@app.delete('/delete-message/{message_id}/', response_model=dict)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    return logic.delete_message(db, message_id, token)


# @app.get('/auction-winner/{auction_id}/', response_model=dict)
# def is_auction_winner(
#     auction_id: int,
#     db: Session = Depends(get_db), token: str = Header(None)
# ):
#     return logic.is_auction_winner(db, token, auction_id)


@app.get('/unread-messages/', response_model=list[schema.Message])
def unread_messages(
    db: Session = Depends(get_db), token: str = Header(None)
):
    return logic.unread_messages(db, token)


@app.get('/users-posts/', response_model=list[schema.Post])
def get_users_posts(
    db: Session = Depends(get_db), token: str = Header(None)
):
    return logic.get_users_posts(db, token)


@app.get('/get-post/{auction_id}/', response_model=schema.Post)
def get_auction(
    auction_id: int,
    db: Session = Depends(get_db)
):
    return logic.get_post(db, auction_id)


@app.get('/active-conversations/', response_model=list[schema.User])
def get_active_coversations(
    db: Session = Depends(get_db), token: str = Header(None)
):
    return logic.get_active_conversations(db, token)


# @app.get('/auction-wins/', response_model=List[schema.Post])
# def get_auction_wins(
#     db: Session = Depends(get_db), token: str = Header(None)
# ):
#     return logic.get_auction_wins(db, token)


# @app.get('/admin-get-auction/{auction_id}/', response_model=schema.Post)
# def admin_get_auction(
#     auction_id: int,
#     db: Session = Depends(get_db), token: str = Header(None),
#     media_type: str = Header(None)
# ):
#     return logic.admin_get_auction(db, auction_id, token)


@app.get('/Search-post/', response_model=list[schema.Post])
def Search_auction(
    db: Session = Depends(get_db),
    query_params: schema.SearchParams = Depends()
):
    return logic.Search_Αuction(db, query_params)


@app.put("/logout/", response_model=dict)
def logout(
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    return logic.logout(db, token)


# @app.get('/categories/', response_model=list[schema.Category])
# def get_all_categories(
#     db: Session = Depends(get_db),
# ):
#     return logic.get_all_categories(db)

@app.get("/drop-database")
async def drop_database():
    drop_all_tables()
    return {"message": "Database dropped"}

@app.get("/rebuild-database")
async def rebuild_database():
    drop_all_tables()
    run_alembic_migrations()
    return {"message": "Database rebuilt"}



if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8080, reload=True)
