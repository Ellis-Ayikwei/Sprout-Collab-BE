#!/usr/bin/python3
"""The module for collab members"""
from models.basemodel import BaseModel, Base
import sqlalchemy
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Boolean,
    Enum as sqlEnum
)

class Collaboration_members(BaseModel, Base):
    """Class definition for the Collab_members"""
    __tablename__ = "collaboration_members"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    Collaboration_id = Column(String(60), ForeignKey("collaborations.id"), nullable=False)
    role = Column(sqlEnum('admin', 'member', name='role'), nullable=False)
    
    def __init__(self, *args, **kwargs):
        """Initialization of the collaboration_members"""
        super().__init__(*args, **kwargs)