#!/usr/bin/python3
"""the module for the user class"""
from models.basemodel import BaseModel, Base
import time
import uuid
import sqlalchemy
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer
)

class User(BaseModel, Base):
    """Class definition for the"""
    __tablename__="users"

    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    username = Column(String(128), nullable=False)
    profile_picture = Column(String(250), nullable=True)
    skills = Column(String(128), nullable=True)
    
    def __init__(self, *args, **kwargs):
        """Initialization of the user"""
        super().__init__(*args, **kwargs)