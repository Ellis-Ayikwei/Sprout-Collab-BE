#!/usr/bin/python3
"""the mmodule for goal member"""
from models.basemodel import BaseModel, Base
import sqlalchemy
from models.miscelleaneousClasses import status

from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Boolean,
    Date,
    Enum as sqlEnum
)

class Goal_member(BaseModel, Base):
    """Class definition for the goal_members"""
    __tablename__ = "goal_members"
    user_id = Column(String(60), ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id", ondelete='CASCADE'), nullable=False)
    status = Column(sqlEnum(status), default=status.pending, nullable=False)
    progress = Column(Integer, default=0, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)


    def __init__(self, *args, **kwargs):
        """Initialization of the goal_members"""
        super().__init__(*args, **kwargs)
        
    def __init__(self, *args, **kwargs):
        """Initialization of the task"""
        super().__init__(*args, **kwargs)
        if "status" in kwargs:
            if kwargs["status"] in status:
                self.status = status[kwargs["status"]]

    def to_dict(self):
        """Return a dictionary representation of the task, ensuring enum conversion"""
        dict_rep = super().to_dict()
        if isinstance(self.status, status):
            dict_rep["status"] = self.status.name
        else:
            dict_rep["status"] = self.status
        return dict_rep