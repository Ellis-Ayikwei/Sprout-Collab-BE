#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint
from models import storage

app_views = Blueprint('app_views', __name__, url_prefix='/sc/api/v1')

"""Import for the views"""
from api.v1.views.index import *
from api.v1.views.goal import *
from api.v1.views.user import *
from api.v1.views.project import *
from api.v1.views.collaboration import *
from api.v1.views.goal_type import *
from api.v1.views.project_member import *
from api.v1.views.task import *
from api.v1.views.task_member import *
from api.v1.views.goal_member import *
from api.v1.views.resource import *
from api.v1.views.collaboration_member import *
