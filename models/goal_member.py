#!/usr/bin/python3
"""the mmodule for goal member"""
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

class Goal_member(BaseModel, Base):
    """Class definition for the goal_members"""
    __tablename__ = "goal_members"
    user_id = Column(String(60), ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id", ondelete='CASCADE'), nullable=False)
    collab_id = Column(String(60), ForeignKey("collaborations.id", ondelete='CASCADE'), nullable=False)


    def __init__(self, *args, **kwargs):
        """Initialization of the goal_members"""
        super().__init__(*args, **kwargs)