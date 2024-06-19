
#!/usr/bin/python3
"""the module for the tasks"""
from models.basemodel import BaseModel, Base
import time
import uuid
import sqlalchemy
from models.miscelleaneousClasses import status
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Boolean,
    Enum as sqlEnum
)




class Task(BaseModel, Base):
    """Class definition for the project"""
    __tablename__ = "tasks"
    goal_id = Column(String(128), ForeignKey("goals.id"), nullable=False)
    project_id = Column(String(128), ForeignKey("projects.id"), nullable=False)
    name = Column(String(128), nullable=False)
    description = Column(String(128), nullable=False)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    status = Column(sqlEnum(status), nullable=False)
    members = relationship("Task_members", backref="projects")

    def __repr__(self):
        """return a string representation of the project"""
        return self.__str__

    def __init__(self, *args, **kwargs):
        """Initialization of the project"""
        super().__init__(*args, **kwargs)
        
