#!/usr/bin/python3
"""the blue print for the index"""
from flask import Flask, jsonify
from api.v1.views import app_views
from models import storage


@app_views.route("/status")
def status():
    """to check the status of the api"""
    return jsonify({'status' : 'ok you are connected to sprout collab'})


@app_views.route("/stats")
def storage_counts():
    '''
        return counts of all classes in storage
    '''
    cls_counts = {
        "Users": storage.count("User"),
        "Collabs": storage.count("Collaboration"),
        "Goals": storage.count("Goal"),
        "Projects": storage.count("Project"),
        "Tasks": storage.count("Task"),
        "Resources": storage.count("Resource"),
    }
    return jsonify(cls_counts)
