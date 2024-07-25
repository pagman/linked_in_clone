from sqlalchemy import (
    Column, Integer, String, ForeignKey, Boolean, Float, Table, DateTime, JSON
)
from sqlalchemy.orm import relationship
from db import Base
from typing import Optional, List


auction_category = Table(
    'auction_category', Base.metadata,
    Column('Post_id', Integer, ForeignKey('Posts.id')),
    Column('category_id', Integer, ForeignKey('Categories.id'))
)



class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    afm = Column(String, nullable=False)
    validated = Column(Boolean, nullable=False)
    role = Column(String, nullable=False)
    seller_rating = Column(Float, nullable=True)
    bidder_rating = Column(Float, nullable=True)
    location = Column(String, nullable=False)
    country = Column(String, nullable=False)
    img = Column(String, nullable=False)
    work_exp = Column(String, nullable=False)
    work_exp_visible = Column(Boolean, nullable=False)
    education = Column(String, nullable=False)
    education_visible = Column(Boolean, nullable=False)
    expertise = Column(String, nullable=False)
    expertise_visible = Column(Boolean, nullable=False)
    
class Friend(Base):
    __tablename__ = "friends"
    id = Column(Integer, primary_key=True)
    requester_id = Column(Integer, ForeignKey("Users.id"))
    requestee_id = Column(Integer, ForeignKey("Users.id"))
    requestee_name = Column(String, ForeignKey("Users.username"))
    status = Column(String, default="pending")  # Initial status of friend request

    requester = relationship("User", foreign_keys=[requester_id], backref="sent_friend_requests")  # Optional for one-to-many relationship
    requestee = relationship("User", foreign_keys=[requestee_id], backref="received_friend_requests")  # Optional for one-to-many relationship

class FriendRequest(Base):
    __tablename__ = 'friend_requests'
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    receiver_id = Column(Integer, ForeignKey('Users.id'))
    requestee_name = Column(String, ForeignKey("Users.username"))
    status = Column(String, default='pending')  # can be 'pending', 'accepted', or 'rejected'

    requester = relationship('User', foreign_keys=[requester_id])
    receiver = relationship('User', foreign_keys=[receiver_id])


class TokenSession(Base):
    __tablename__ = "TokenSessions"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, nullable=False, unique=True, index=True)
    active = Column(Boolean, nullable=False)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    user = relationship("User")


class Post(Base):
    __tablename__ = "Posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    user = relationship("User")
    img = Column(String, nullable=True)
    audio = Column(String, nullable=True)
    video = Column(String, nullable=True)
    interested_users = Column(JSON, default=list)
    comments = Column(JSON, default=list)
    photos = relationship("Photo")



class Ad(Base):
    __tablename__ = "Ads"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    user = relationship("User")
    img = Column(String, nullable=True)
    interested_users = Column(JSON, default=list)

    # photos = relationship("Photo")


class Category(Base):
    __tablename__ = "Categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    posts = relationship("Post", secondary=auction_category)


class Photo(Base):
    __tablename__ = "Photos"

    id = Column(Integer, primary_key=True, index=True)
    URL = Column(String, nullable=False)
    post_id = Column(Integer, ForeignKey("Posts.id"), nullable=False)
    post = relationship("Post")


class Bid(Base):
    __tablename__ = "Bids"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("Posts.id"), nullable=False)
    post = relationship("Post")
    bidder_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    bidder = relationship("User")
    time = Column(DateTime(timezone=True), nullable=False)
    amount = Column(Float, nullable=False)


class Location(Base):
    __tablename__ = "Locations"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float, nullable=False)
    longtitude = Column(Float, nullable=False)
    Address = Column(String, nullable=False)
    Country = Column(String, nullable=False)


class Message(Base):
    __tablename__ = "Messages"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    sender = relationship("User", foreign_keys=[sender_id])
    receiver_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    receiver = relationship("User", foreign_keys=[receiver_id])
    message = Column(String, nullable=False)
    read = Column(Boolean, nullable=False)
    # auction_id = Column(Integer, ForeignKey("Auctions.id"), nullable=False)
    # auction = relationship("Auction")
