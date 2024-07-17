#!/usr/bin/python3
"""a module for checklist items"""
from models.basemodel import BaseModel, Base
from sqlalchemy import (
    Column,
    String,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import relationship

class ChecklistItem(BaseModel, Base):
    """Class definition for checklist items"""
    __tablename__ = "checklist_items"
    task_id = Column(String(60), ForeignKey("tasks.id", ondelete='CASCADE'), nullable=False)
    description = Column(String(255), nullable=False)
    is_completed = Column(Boolean, default=False, nullable=False)
    name = Column(String(128), deafault="the checklist" nullable=True)

    user_checklist_items = relationship("UserChecklistItem", back_populates="checklist_item", cascade="all, delete-orphan")

    def __repr__(self):
        """Return a string representation of the checklist item"""
        return f"<ChecklistItem {self.id} - Task: {self.task_id}, Description: {self.description}, Completed: {self.is_completed}>"

    def to_dict(self):
        """Return a dictionary representation of the checklist item"""
        dict_rep = super().to_dict()
        dict_rep["description"] = self.description
        dict_rep["is_completed"] = self.is_completed
        return dict_rep
