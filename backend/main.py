from fastapi import FastAPI, Depends, Request, Header, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import schema
import models
import errors
from typing import List
from db import get_db, drop_all_tables, run_alembic_migrations
import logic
from wrapper import Wrapper
from typing import List
from fastapi.middleware.cors import CORSMiddleware




origins = ["https://localhost:3000"]
app = FastAPI()
# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain('ssl/cert.pem', keyfile='ssl/key.pem')
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
def get_post(
    db: Session = Depends(get_db), token: str = Header(None),
    # query_params: schema.ItemQueryParams = Depends()
):
    return logic.get_post(db, token)

@app.get("/ads/", response_model=List[schema.Ad])
def get_ads(
    db: Session = Depends(get_db), token: str = Header(None),
    # query_params: schema.ItemQueryParams = Depends()
):
    return logic.get_ads(db, token)


@app.post("/create-post/", response_model=schema.Post)
def create_post(
    body: schema.PostCreate, db: Session = Depends(get_db),
    token: str = Header(None)
):
    return logic.create_post(db, body, token)

@app.post("/create-ad/", response_model=schema.Post)
def create_ad(
    body: schema.AdCreate, db: Session = Depends(get_db),
    token: str = Header(None)
):
    return logic.create_ad(db, body, token)


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

@app.get('/users-ads/', response_model=list[schema.Ad])
def get_users_ads(
    db: Session = Depends(get_db), token: str = Header(None)
):
    return logic.get_users_ads(db, token)


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

@app.post("/friends/requests")
def send_friend_request(request: schema.Friend, db: Session = Depends(get_db)):
    
    # Check if request is for the current user or an existing friend
    
    # Create a new friend request
    friend = models.Friend(requester_id=request.requester_id, requestee_id=request.requestee_id)
    db.add(friend)
    db.commit()
    db.refresh(friend)

    return {"message": "Friend request sent successfully"}

@app.get("/users/{user_id}/pending-friends")
def get_pending_friend_requests(user_id: int, db: Session = Depends(get_db)):
    # Check if user exists (optional)

    # Query for pending friend requests for the user
    pending_requests = db.query(models.Friend) \
        .filter(models.Friend.requestee_id == user_id, models.Friend.status == "pending") \
        .order_by(models.Friend.id.asc()) \
        .all()

    # Optionally, populate user information from the relationships
    if pending_requests:
        for request in pending_requests:
            request.requester = db.get(models.User, request.requester_id)  # Assuming one-to-one or one-to-many relationship

    return pending_requests

@app.put("/friends/requests/{friend_request_id}", status_code=status.HTTP_200_OK)
async def approve_friend_request(friend_request_id: int, current_user: schema.User = Depends()):
    # Fetch the friend request
    friend_request = await app.db.query(schema.Friend).filter(schema.Friend.id == friend_request_id).first()

    # Check if request exists and is for the current user
    if not friend_request or friend_request.requestee_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend")

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, ssl_keyfile="ssl/key.pem", ssl_certfile="ssl/cert.pem")
