from datetime import datetime
import bcrypt
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
    DateTime,
    Integer,
    String,
    Text,
)



class User(BaseModel, Base):
    """User class"""
    __tablename__ = 'users'

    google_0auth_uid = Column(String(255), nullable=True)
    email = Column(String(254), nullable=False, unique=True, index=True)
    first_name = Column(String(150), nullable=False)
    last_name = Column(String(128), nullable=True)
    username = Column(String(128), nullable=True, unique=True, index=True)
    password = Column(String(128), nullable=False)
    skills = Column(JSON, nullable=True)
    profile_picture = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    date_joined = Column(DateTime, nullable=False, default=datetime.utcnow)
    is_active = Column(Integer, nullable=False, default=1)
    is_staff = Column(Integer, nullable=False, default=0)
    is_superuser = Column(Integer, nullable=False, default=0)
    last_login = Column(DateTime, nullable=True)
    resource = relationship("Resource", backref="users")

    def __init__(self, *args, **kwargs):
        """Initialization of the user"""
        super().__init__(*args, **kwargs)
        if 'skills' in kwargs:
            self.skills = kwargs['skills']
        if 'password' in kwargs:
            self.password = self._hash_password(kwargs['password'])


    def _hash_password(self, password: str) -> str:
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt)

    def verify_password(self, password: str) -> bool:
       return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password.encode('utf-8')
        )

    def get_skills_list(self):
        return json.loads(self.skills) if self.skills else []

    def update_password(self, new_password: str):
        self.password = self._hash_password(new_password)


 