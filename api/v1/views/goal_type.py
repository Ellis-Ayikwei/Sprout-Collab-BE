#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Goal_types """
from models.goal_type import Goal_type
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/goal_types', methods=['GET'], strict_slashes=False)
def get_goal_types():
    """
    Retrieves the list of all Goal_type objects
    """
    all_goal_types = storage.all(Goal_type).values()
    list_goal_types = []
    for goal_type in all_goal_types:
        list_goal_types.append(goal_type.to_dict())
    return jsonify(list_goal_types)



@app_views.route('/goal_types/<goal_type_id>', methods=['GET'], strict_slashes=False)
def get_goal_type(goal_type_id):
    """ Retrieves a specific Goal_type """
    goal_type = storage.get(Goal_type, goal_type_id)
    if not goal_type:
        abort(404)

    return jsonify(goal_type.to_dict())


@app_views.route('/goal_types/<goal_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_goal_type(goal_id):
    """
    Deletes a Goal_type Object
    """

    goal_type = storage.get(Goal_type, goal_id)

    if not goal_type:
        abort(404)

    storage.delete(goal_type)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/goal_types', methods=['POST'], strict_slashes=False)
def post_goal_type():
    """
    Creates a Goal_type
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    goal_type = Goal_type(**data)
    goal_type.save()
    return make_response(jsonify(goal_type.to_dict()), 201)


@app_views.route('/goal_types/<goal_id>', methods=['PUT'], strict_slashes=False)
def put_goal_type(goal_id):
    """
    Updates a Goal_type
    """
    goal_type = storage.get(Goal_type, goal_id)

    if not goal_type:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(goal_type, key, value)
    storage.save()
    return make_response(jsonify(goal_type.to_dict()), 200)
