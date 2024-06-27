#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Goals """
from models.goal import Goal
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/goals', methods=['GET'], strict_slashes=False)
def get_goals():
    """
    Retrieves the list of all Goal objects
    """
    all_goals = storage.all(Goal).values()
    list_goals = []
    for goal in all_goals:
        list_goals.append(goal.to_dict())
    return jsonify(list_goals)


@app_views.route('/goals/<goal_id>', methods=['GET'], strict_slashes=False)
def get_goal(goal_id):
    """ Retrieves a specific Goal """
    goal = storage.get(Goal, goal_id)
    if not goal:
        abort(404)

    return jsonify(goal.to_dict())


@app_views.route('/goals/<goal_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_goal(goal_id):
    """
    Deletes a Goal Object
    """

    goal = storage.get(Goal, goal_id)

    if not goal:
        abort(404)

    storage.delete(goal)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/goals', methods=['POST'], strict_slashes=False)
def post_goal():
    """
    Creates a Goal
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Goal(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/goals/<goal_id>', methods=['PUT'], strict_slashes=False)
def put_goal(goal_id):
    """
    Updates a Goal
    """
    goal = storage.get(Goal, goal_id)

    if not goal:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(goal, key, value)
    storage.save()
    return make_response(jsonify(goal.to_dict()), 200)
