#!/usr/bin/python3
"""the module for the resources"""
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




class Resource(BaseModel, Base):
    """Class definition for the resources"""
    __tablename__ = "resources"
    collaboration_id = Column(String(60), ForeignKey("collaborations.id"), nullable=False)
    name = Column(String(128), nullable=False)
    url = Column(String(250), nullable=False)
    visibility = Column(Boolean, nullable=False)
    

    def __init__(self, *args, **kwargs):
        """Initialization of the project"""
        super().__init__(*args, **kwargs)
        
