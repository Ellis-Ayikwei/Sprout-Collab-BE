#!/usr/bin/python3
"""the module for the tasks"""
from models.basemodel import BaseModel, Base
from models.miscelleaneousClasses import status
from sqlalchemy.orm import relationship
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




class Task(BaseModel, Base):
    """Class definition for the task"""
    __tablename__ = "tasks"
    goal_id = Column(String(128), ForeignKey("goals.id"), nullable=False)
    project_id = Column(String(128), ForeignKey("projects.id"), nullable=False)
    name = Column(String(128), nullable=False)
    description = Column(String(128), nullable=False)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    status = Column(sqlEnum(status), default=status.pending, nullable=False)
    members = relationship("Task_member", backref="tasks", cascade="all, delete-orphan")
    checklists = relationship("ChecklistItem", backref="tasks", cascade="all, delete-orphan")
    def __repr__(self):
        """return a string representation of the task"""
        return self.__str__

    def __init__(self, *args, **kwargs):
        """Initialization of the project"""
        super().__init__(*args, **kwargs)
        if "status" in kwargs:
            self.status = status[kwargs["status"]]

    def to_dict(self):
        """Return a dictionary representation of the project, ensuring enum conversion"""
        dict_rep = super().to_dict()
        if isinstance(self.status, status):
            dict_rep["status"] = self.status.name
        else:
            dict_rep["status"] = self.status
        return dict_rep