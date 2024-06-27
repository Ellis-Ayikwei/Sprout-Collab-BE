#!/usr/bin/python3
""" objects that handles all default RestFul API actions for projects """
from models.collaboration import Collaboration
from models.project import Project
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from




@app_views.route('/collaborations/<collaboration_id>/projects', methods=['GET'],
                 strict_slashes=False)
def get_projects(collaboration_id):
    """
    Retrieves the list of all projects objects
    of a specific Project, or a specific collaboration
    """
    list_projects = []
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404)
    for member in collaboration.projects:
        list_projects.append(member.to_dict())

    return jsonify(list_projects)


@app_views.route('/projects/<project_id>/', methods=['GET'], strict_slashes=False)
def get_project(project_id):
    """
    Retrieves a specific collaboration based on id
    """
    project = storage.get(Project, project_id)
    if not project:
        abort(404)
    return jsonify(project.to_dict())


@app_views.route('/projects/<project_id>', methods=['DELETE'], strict_slashes=False)
def delete_project(project_id):
    """
    Deletes a collaboration based on id provided
    """
    project = storage.get(Project, project_id)

    if not project:
        abort(404)
    storage.delete(project)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/collaborations/<collaboration_id>/projects', methods=['POST'],
                 strict_slashes=False)
def post_project(collaboration_id):
    """
    Creates a Collaboration
    """
    
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")
   

    data = request.get_json()
    new_project = Project(**data)
    new_project.collab_id = collaboration.id
    new_project.goal_id = collaboration.goal_id
    new_project.save()
    return make_response(jsonify(new_project.to_dict()), 201)


@app_views.route('/projects/<project_id>', methods=['PUT'], strict_slashes=False)
def put_project(project_id):
    """
    Updates a Collaboration
    """
    project = storage.get(Project, project_id)
    if not project:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'goal_id', 'collab_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(project, key, value)
    storage.save()
    return make_response(jsonify(project.to_dict()), 200)
