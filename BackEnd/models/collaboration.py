#!/usr/bin/python33
"""the module for the collaborations"""
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



class Collaboration(BaseModel, Base):
    """Class definition for the collaboration"""
    __tablename__ = "collaborations"
    collaborator_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id"), nullable=False)
    description = Column(String(250), nullable=True )
    is_public = Column(Boolean, nullable=False)
    members = relationship("Collaboration_members", backref="collaborations")
    

    def __init__(self, *args, **kwargs):
        """Initialization of the goal"""
        super().__init__(*args, **kwargs)