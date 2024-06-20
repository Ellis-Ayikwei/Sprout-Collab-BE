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

class Goal_members(BaseModel, Base):
    """Class definition for the goal_members"""
    __tablename__ = "goal_members"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id"), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialization of the goal_members"""
        super().__init__(*args, **kwargs)