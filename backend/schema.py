from pydantic import BaseModel, validator, Field
from datetime import datetime
from typing import Optional, List
from typing_extensions import Literal
import json


class SearchParams(BaseModel):
    category: Optional[str]  # this is a dict with a list as a string
    free_text: Optional[str]
    skip: Optional[int] = 0
    limit: Optional[int] = 10

    @validator("category")
    def parse_category(cls, category):
        if not category:
            return category
        return json.loads(category)

class Friend(BaseModel):
    requester_id: int
    requestee_id: int
    requestee_name: str
    status: str = "pending"  # Initial status of friend request

class ChangePasswordRequest(BaseModel):
    new_password: str

class ChangeUsernameRequest(BaseModel):
    new_username: str

class User(BaseModel):
    id: int
    username: str
    password: str
    email: str
    name: str
    surname: str
    phone: str
    location: str
    country: str
    afm: str
    role: str
    validated: bool
    img: str
    work_exp: str = Field(default=" ")
    work_exp_visible: bool = Field(default=True)
    education: str = Field(default=" ")
    education_visible: bool = Field(default=True)
    expertise: str = Field(default=" ")
    expertise_visible: bool = Field(default=True)

    class Config:
        orm_mode = True





class UserCreate(BaseModel):
    username: str = Field(default="admin")
    password: str = Field(default="admin")
    email: str
    name: str
    surname: str
    phone: str
    location: str
    country: str
    afm: str
    role: str = Field(default="admin")
    img: str
    work_exp: str = Field(default=" ")
    work_exp_visible: bool = Field(default=True)
    education: str = Field(default=" ")
    education_visible: bool = Field(default=True)
    expertise: str = Field(default=" ")
    expertise_visible: bool = Field(default=True)


class UserId(BaseModel):
    user_id: int


class Pagination(BaseModel):
    skip: Optional[int]
    limit: Optional[int]


class ItemQueryParams(Pagination):
    order_by: Optional[Literal["ends"]]


class LoginCredentials(BaseModel):
    username: str = Field(default="admin")
    password: str = Field(default="admin")


class LoginToken(BaseModel):
    token: str
    role: str
    user_id: int


class Photo(BaseModel):
    id: str
    auction_id: str
    URL: str

    class Config:
        orm_mode = True


class Bid(BaseModel):
    id: int
    post_id: int
    bidder_id: int
    time: datetime
    amount: float

    class Config:
        orm_mode = True


class Category(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class Post(BaseModel):
    id: int
    title: str
    description: str = Field(default=" ")
    user_id: int
    img: str = Field(default=" ")
    audio: str = Field(default=" ")
    video: str = Field(default=" ")
    interested_users: List[str] = Field(default=[""])
    
 
    class Config:
        from_attributes = True

class Interest(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: datetime

    class Config:
        orm_mode: True

class PostWithInterests(BaseModel):
    id: int
    title: str
    content: str
    interests: List[Interest] = []

    class Config:
        orm_mode: True

class Ad(BaseModel):
    id: int
    title: str
    description: str = Field(default=" ")
    user_id: int
    img: str = Field(default=" ")
 
    class Config:
        from_attributes = True


class ModifyPost(BaseModel):
    id: int
    name: str
    buy_price: float
    location: str
    country: str
    start: datetime
    # ends: datetime
    description: str
    longtitude: str
    latitude: str
    categories: Optional[list]
    img: str


class SubmitBid(BaseModel):
    auction_id: int
    time: datetime
    amount: float


class PostCreate(BaseModel):    
    title: str
    description: str = Field(default=" ")
    # user_id: int
    img: str = Field(default=" ")
    audio: str = Field(default=" ")
    video: str = Field(default=" ")

class AdCreate(BaseModel):    
    title: str
    description: str = Field(default=" ")
    # user_id: int
    img: str = Field(default=" ")


class Message(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    message: str
    read: bool

    class Config:
        orm_mode = True


class SendMessage(BaseModel):
    receiver_id: int
    message: str


class DeleteMessage(BaseModel):
    id: int


class IsAuctionWinner(BaseModel):
    auction_id: int
