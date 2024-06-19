#!/usr/bin/python3
"""the blue print for the index"""
from flask import jsonify
from views import app_views


app_views.route("/status", strict_slashes=True)
def status():
    """to chech the status of the api"""
    return(jsonify({"status" : "ok"}))
