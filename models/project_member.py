#!/usr/bin/python3
"""the module for projecct_members"""
from models.basemodel import BaseModel, Base
import sqlalchemy
from sqlalchemy import (
    Column,
    Date,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Boolean,
    Enum as sqlEnum
)

from models.miscelleaneousClasses import status

class Project_member(BaseModel, Base):
    """Class definition for the project_members"""
    __tablename__ = "project_members"
    project_id = Column(String(60), ForeignKey("projects.id"), nullable=False)
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id"), nullable=False)
    status = Column(sqlEnum(status), default=status.pending, nullable=False)
    progress = Column(Integer, default=0, nullable=False)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    is_approved = Column(Boolean, default=False, nullable=False)


    def __repr__(self):
        """return a string representation of the task"""
        return self.__str__

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