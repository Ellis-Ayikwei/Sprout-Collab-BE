#!/usr/bin/python3
""" objects that handles all default RestFul API actions for collaborations """
from api.v1.views.helper_functions import get_user_id_from_all_user
from models.collaboration import Collaboration
from models.collaboration_member import Collaboration_member
from models.goal import Goal
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/collaborations', methods=['GET'], strict_slashes=False)
def get_all_collaborations():
    """
    Retrieves the list of all collaborations.
    """
    collaborations = storage.all(Collaboration).values()
    if not collaborations:
        abort(404)

    collaboration_dicts = [collaboration.to_dict() for collaboration in collaborations]

    return jsonify(collaboration_dicts)


@app_views.route('/goals/<goal_id>/collaborations', methods=['GET'],
                 strict_slashes=False)
def get_collaborations(goal_id):
    """
    Retrieves the list of all collaborations objects
    of a specific Goal, or a specific collaboration
    """
    list_collaborations = []
    goal = storage.get(Goal, goal_id)
    if not goal:
        abort(404)
    for collaboration in goal.Collaborations:
        list_collaborations.append(collaboration.to_dict())

    return jsonify(list_collaborations)


@app_views.route('/collaborations/<collaboration_id>/', methods=['GET'], strict_slashes=False)
def get_collaboration(collaboration_id):
    """
    Retrieves a specific collaboration based on id
    """
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404)
    return jsonify(collaboration.to_dict())


@app_views.route('/collaborations/<collaboration_id>', methods=['DELETE'], strict_slashes=False)
def delete_collaboration(collaboration_id):
    """
    Deletes a collaboration based on id provided
    """
    collaboration = storage.get(Collaboration, collaboration_id)

    if not collaboration:
        abort(404)
    storage.delete(collaboration)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/goals/<goal_id>/collaborations', methods=['POST'],
                 strict_slashes=False)
def post_collaboration(goal_id):
    """
    Creates a Collaboration
    """
    goal = storage.get(Goal, goal_id)
    if not goal:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")

  

    data = request.get_json()
    collaboration = Collaboration(admin_id=user_id, **data)
    collaboration.goal_id = goal.id
    collaboration.save()
    
    user_id = get_user_id_from_all_user(data)
    new_member = Collaboration_member(role="admin", collaboration_id=collaboration.id, user_id=user_id)
    new_member.save()

   
    return make_response(jsonify(collaboration.to_dict()), 201)


@app_views.route('/collaborations/<collaboration_id>', methods=['PUT'], strict_slashes=False)
def put_collaboration(collaboration_id):
    """
    Updates a Collaboration
    """
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'goal_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(collaboration, key, value)
    storage.save()
    return make_response(jsonify(collaboration.to_dict()), 200)
