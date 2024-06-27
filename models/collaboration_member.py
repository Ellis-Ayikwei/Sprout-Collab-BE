#!/usr/bin/python3
"""The module for collab members"""
from models.basemodel import BaseModel, Base
import sqlalchemy
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Boolean,
    Enum as sqlEnum
)

class Collaboration_member(BaseModel, Base):
    """Class definition for the Collab_members"""
    __tablename__ = "collaboration_members"
    user_id = Column(String(60), ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    collaboration_id= Column(String(60), ForeignKey("collaborations.id", ondelete='CASCADE'), nullable=False)
    role = Column(sqlEnum('admin', 'member', name='role'), default='member', nullable=False)
    
    user = relationship("User", backref="collaboration_members")
    
    def __init__(self, *args, **kwargs):
        """Initialization of the collaboration_members"""
        super().__init__(*args, **kwargs)