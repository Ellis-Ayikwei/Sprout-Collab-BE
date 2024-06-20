#!/usr/bin/python3
"""the module for the goals"""
from models.basemodel import BaseModel, Base

import time
import uuid
import sqlalchemy
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Boolean
)



class Goal(BaseModel, Base):
    """Class definition for the goal"""
    __tablename__ = 'goals'
    name = Column(String(128), nullable=False)
    description = Column(String(128), nullable=False)
    target_completion_date = Column(DateTime, nullable=True)
    is_public = Column(Boolean, nullable=False)
    type = Column(String(60), ForeignKey("goal_types.id"), nullable=False)
    projects = relationship("Project", backref="goals")
    Collaborations = relationship("Collaboration", backref="goals")
    members = relationship("Goal_members", backref="goals")

    def __init__(self, *args, **kwargs):
        """Initialization of the goal"""
        super().__init__(*args, **kwargs)