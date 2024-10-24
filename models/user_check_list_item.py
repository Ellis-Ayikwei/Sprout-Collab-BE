#!/usr/bin/python3
"""a module for user checklist items"""
from models.basemodel import BaseModel, Base
from sqlalchemy import (
    Column,
    String,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import relationship

class UserChecklistItem(BaseModel, Base):
    """Class definition for user checklist items"""
    __tablename__ = "user_checklist_items"
    user_id = Column(String(60), ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    checklist_item_id = Column(String(60), ForeignKey("checklist_items.id", ondelete='CASCADE'), nullable=False)
    is_completed = Column(Boolean, default=False, nullable=False)
    task_member_id = Column(String(60), ForeignKey("task_members.id", ondelete='CASCADE'), nullable=True)
    
    checklist_item = relationship("ChecklistItem", back_populates="user_checklist_items")

    def __repr__(self):
        """Return a string representation of the user checklist item"""
        return f"<UserChecklistItem {self.id} - User: {self.user_id}, ChecklistItem: {self.checklist_item_id}, Completed: {self.is_completed}>"

    def to_dict(self):
        """Return a dictionary representation of the user checklist item"""
        dict_rep = super().to_dict()
        dict_rep["user_id"] = self.user_id
        dict_rep["checklist_item_id"] = self.checklist_item_id
        dict_rep["is_completed"] = self.is_completed
        return dict_rep

