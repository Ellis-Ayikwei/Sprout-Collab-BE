#!/usr/bin/python3
"""the module for the pprojects"""
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




class Project(BaseModel, Base):
    """Class definition for the project"""
    __tablename__ = "projects"
    goal_id = Column(String(128), ForeignKey("goals.id", ondelete='CASCADE'), nullable=False)
    collab_id = Column(String(128), ForeignKey("collaborations.id", ondelete='CASCADE'), nullable=False)
    name = Column(String(128), nullable=False)
    description = Column(String(128), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False) 
    status = Column(sqlEnum(status), name="status", default=status.pending, nullable=False)
    progress = Column(Integer, default=0, nullable=True)
    no_of_members_done = Column(Integer, default=0, nullable=True)

    
    tasks = relationship("Task", backref="projects", cascade="all, delete-orphan")
    members = relationship("Project_member", backref="projects", cascade="all, delete-orphan")

    def __repr__(self):
        """Return a string representation of the project"""
        return f"<Project {self.name}>"

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
