#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint
from models import storage

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

"""Import for the views"""
from api.v1.views.index import *