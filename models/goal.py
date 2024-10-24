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

from models.collaboration import Collaboration



class Goal(BaseModel, Base):
    """Class definition for the goal"""
    __tablename__ = 'goals'
    name = Column(String(128), nullable=False)
    description = Column(String(128), nullable=False)
    duration = Column(Integer, nullable=True)
    is_public = Column(Boolean, nullable=False)
    type = Column(String(60), ForeignKey("goal_types.id"), nullable=False)
    
    projects = relationship("Project", backref="goals", cascade="all, delete-orphan")
    collaborations = relationship("Collaboration", backref="goals", cascade="all, delete-orphan")
    tasks = relationship("Task", backref="goals", cascade="all, delete-orphan")
    members = relationship("Goal_member", backref="goals", cascade="all, delete-orphan")
    creator_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    creator = relationship("User", backref="goals")

    def __init__(self, *args, **kwargs):
        """Initialization of the goal"""
        super().__init__(*args, **kwargs)
        
        
    @property
    def number_of_collaborations(self):
        """Returns the count of collaborations for this goal"""
        return len(self.collaborations)

    def count_collaborations(self, session):
        """Returns the count of collaborations for this goal using a database session"""
        return session.query(func.count(Collaboration.id)).filter(Collaboration.goal_id == self.id).scalar()
