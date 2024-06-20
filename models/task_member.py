#!/usr/bin/python3
"""a module for the task_member"""
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

class Task_members(BaseModel, Base):
    """Class definition for the Task_members"""
    __tablename__ = "task_members"
    project_id = Column(String(60), ForeignKey("projects.id"), nullable=False)
    task_id = Column(String(60), ForeignKey("tasks.id"), nullable=False)
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id"), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialization of the task_members"""
        super().__init__(*args, **kwargs)