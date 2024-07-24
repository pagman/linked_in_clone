from fastapi import FastAPI, Depends, Request, Header, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, subqueryload
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
from sqlalchemy.future import select




origins = ["https://localhost:3000","https://localhost:8000"]
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


@app.put("/users/{user_id}/change-password")
def change_password(user_id: int, change_password_request: schema.ChangePasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Update the password directly
    user.password = change_password_request.new_password
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully"}

@app.put("/users/{user_id}/change-username")
def change_username(user_id: int, change_username_request: schema.ChangeUsernameRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    existing_user = db.query(models.User).filter(models.User.username == change_username_request.new_username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken")

    # Update the username directly
    user.username = change_username_request.new_username
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Username updated successfully"}

@app.put("/update-user/{user_id}")
def update_user(user_id: int, user_update: schema.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Update the user fields
    user.work_exp = user_update.work_exp
    user.work_exp_visible = user_update.work_exp_visible
    user.education = user_update.education
    user.education_visible = user_update.education_visible
    user.expertise = user_update.expertise
    user.expertise_visible = user_update.expertise_visible
    user.img = user_update.img

    db.commit()
    db.refresh(user)

    return user

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


# @app.get('/get-post/{auction_id}/', response_model=schema.Post)
# def get_auction(
#     auction_id: int,
#     db: Session = Depends(get_db)
# ):
#     return logic.get_post(db, auction_id)

@app.get('/get-user_id/{user_id}/', response_model=schema.User)
def get_user(
    id: int,
    db: Session = Depends(get_db)
):
    return logic.get_user(db, id)




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
    # query_params: schema.SearchParams = Depends()
):
    return logic.Search_Αuction(db)


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
    friend = models.Friend(requester_id=request.requester_id, requestee_id=request.requestee_id,requestee_name =  request.requestee_name)
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

@app.put("/friends/requests/{friend_request_id}")
def approve_friend_request(friend_request_id: int, db: Session = Depends(get_db)):
    # ... existing logic for fetching the request ...
    friend_request = db.query(models.Friend).filter(models.Friend.id == friend_request_id).first()

    # Update the friend request status
    friend_request.status = "accepted"  # Set status to accepted

    db.commit()

    return {"message": "Friend request approved successfully"}

@app.get("/users/{user_id}/friends")
def get_friends(user_id: int, db: Session = Depends(get_db)):
    # Check if user exists (optional)

    # Option 1: Using relationship on User model (assuming one-to-many)
    if "friends" in models.User.__dict__:  # Check if 'friends' field is present
        friends = db.query(models.User).filter(models.User.id == user_id).first().friends

    # Option 2: Querying Friend model directly
    else:
        friends = db.query(models.Friend) \
            .filter(models.Friend.requestee_id == user_id, models.Friend.status == "accepted") \
            .join(models.User, models.Friend.requester_id == models.User.id) \
            .order_by(models.Friend.id.asc()) \
            .all()
    
    if not isinstance(friends, list):  # Check if friends is already a list (from relationship)
            friends = [
                {"username": friend.requester.username, **friend.__dict__}
                for friend in friends
            ]  # Include other friend attributes if desired


    return friends

# @app.get('/categories/', response_model=list[schema.Category])
# def get_all_categories(
#     db: Session = Depends(get_db),
# ):
#     return logic.get_all_categories(db)

# @app.post("/interest/")
# def show_interest(interest: schema.UserInterestCreate, db: Session = Depends(get_db)):
#     # Check if the post exists
#     post = db.query(models.Post).filter(models.Post.id == interest.post_id).first()
#     if not post:
#         raise HTTPException(status_code=404, detail="Post not found")

#     # Check if the user exists
#     user = db.query(models.User).filter(models.User.id == interest.user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # Check if the interest already exists
#     existing_interest = db.query(models.Interest).filter(models.Interest.user_id == interest.user_id, models.Interest.post_id == interest.post_id).first()
#     if existing_interest:
#         raise HTTPException(status_code=400, detail="User has already shown interest in this post")

#     # Create the interest
#     new_interest = models.Interest(user_id=interest.user_id, post_id=interest.post_id)
#     db.add(new_interest)
#     db.commit()
#     db.refresh(new_interest)

#     return {"message": "Interest recorded successfully", "interest": new_interest}

@app.put("/posts/{post_id}/interest/", response_model=schema.Post)
def show_interest(post_id: int, username: str, db: Session = Depends(get_db)):
    post = db.execute(select(models.Post).filter(models.Post.id == post_id))
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if username not in post.interested_users:
        post.interested_users.append(username)
        db.commit()
        db.refresh(post)
    
    return post

@app.put("/post/show_interest/", response_model=schema.Post)
def show_interest(
    id:int , name: str,db: Session = Depends(get_db)
):
    return logic.show_interest(db, id, name)

@app.put("/post/add_comment/", response_model=schema.Post)
def add_comments(
    id:int , comments: str,db: Session = Depends(get_db)
):
    return logic.add_comments(db, id, comments)


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
