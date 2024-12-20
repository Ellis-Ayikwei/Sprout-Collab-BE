#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.basemodel import BaseModel, Base
from models.collaboration import Collaboration
from models.collaboration_member import Collaboration_member
from models.goal import Goal
from models.goal_member import Goal_member
from models.goal_type import Goal_type
from models.project import Project
from models.project_member import Project_member
from models.resource import Resource
from models.task import Task
from models.task_member import Task_member
from models.user import User
from models.check_list_item import ChecklistItem
from models.user_check_list_item import UserChecklistItem

from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from configs.sqlEngineConfig import db_url
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {
           "Collaboration": Collaboration,
           "Collaboration_members": Collaboration_member, 
           "Goal": Goal,
           "Goal_members": Goal_member, 
           "Goal_type": Goal_type,
           "Project": Project,
           "Project_members": Project_member, 
           "Resource": Resource, 
           "Task": Task,
           "Task_members": Task_member,
           "User": User,
           "ChecklistItem" : ChecklistItem,
           "UserChecklistItem" : UserChecklistItem,
           }    


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """
        Initializes the object with a database engine.

        This method creates a database engine using the `db_url` provided
        in the `sqlEngineConfig` module.
        The engine is then assigned to the `__engine` attribute of the object.
        """
        self.__engine = create_engine(db_url)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
