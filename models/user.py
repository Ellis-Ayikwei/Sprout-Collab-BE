from sqlalchemy.ext.declarative import declarative_base
#!/usr/bin/python3
"""the module for the user class"""
from models.basemodel import BaseModel, Base
from passlib.hash import pbkdf2_sha256
from sqlalchemy.orm import relationship
import time
import uuid
import sqlalchemy
import json
from sqlalchemy import (
    JSON,
    CheckConstraint,
    Column,
    String,
)



class User(BaseModel, Base):
    """User class"""
    __tablename__ = 'users'

    email = Column(String(128), nullable=False, unique=True, index=True)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    username = Column(String(128), nullable=True, unique=True, index=True)
    password = Column(String(128), nullable=False)
    skills = Column(JSON, nullable=True)
    resource = relationship("Resource", backref="users")
    profile_picture = Column(String(255), nullable=True)

    def __init__(self, *args, **kwargs):
        """Initialization of the user"""
        super().__init__(*args, **kwargs)
        if 'skills' in kwargs:
            self.skills = kwargs['skills']
        if 'password' in kwargs:
            self.password = pbkdf2_sha256.hash(kwargs['password'])

    def verify_password(self, password: str) -> bool:
        return pbkdf2_sha256.verify(password, self.password) if self.password else False

    def get_skills_list(self):
        return json.loads(self.skills) if self.skills else []

    def update_password(self, new_password: str):
        self.password = pbkdf2_sha256.hash(new_password)
