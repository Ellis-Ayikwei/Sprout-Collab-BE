#/usr/bin/python3
"""the module for projecct_members"""
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

class Project_members(BaseModel, Base):
    """Class definition for the project_members"""
    __tablename__ = "project_members"
    project_id = Column(String(60), ForeignKey("projects.id"), nullable=False)
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id"), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialization of the project_members"""
        super().__init__(*args, **kwargs)