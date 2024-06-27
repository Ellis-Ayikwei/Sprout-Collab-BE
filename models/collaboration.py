#!/usr/bin/python3
"""The module for the collaborations"""
from models.basemodel import BaseModel, Base
import sqlalchemy
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column,
    String,
    ForeignKey,
    Boolean
)

class Collaboration(BaseModel, Base):
    """Class definition for the collaboration"""
    __tablename__ = "collaborations"
    name = Column(String(60), nullable=True)
    admin_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    goal_id = Column(String(60), ForeignKey("goals.id"), nullable=False)
    description = Column(String(250), nullable=True)
    is_public = Column(Boolean, default=1, nullable=False)
    
    
    resources = relationship("Resource", backref="collaboration", cascade="all, delete-orphan")
    projects = relationship("Project", backref="collaborations", cascade="all, delete-orphan")
    members = relationship("Collaboration_member", backref="collaborations", cascade="all, delete-orphan")

    def __init__(self, *args, **kwargs):
        """Initialization of the collaboration"""
        super().__init__(*args, **kwargs)
        if 'name' not in kwargs or not kwargs['name']:
            self.name = self.generate_default_name()
        if 'descripton' not in kwargs or not kwargs['description']:
            self.description = f"The Collaboration {self.name}"

    @classmethod
    def generate_default_name(cls):
        """Generate default name based on the number of existing collaborations"""
        from models import storage  # Deferred import to avoid circular import issues
        count = storage.count(Collaboration)
        return f"Collab{count + 1}"
