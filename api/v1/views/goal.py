#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Goals """
from tracemalloc import start

from flask_jwt_extended import get_jwt, get_jwt_header, get_jwt_identity, jwt_required, verify_jwt_in_request
from models.goal import Goal
from models import collaboration, storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from

from models.goal_member import Goal_member
from models.user import User


@app_views.route('/goals', methods=['GET'], strict_slashes=False)
# @jwt_required(refresh=True)
def get_goals():
    """
    Retrieves the list of all Goal objects
    """
    auts = request.headers
    verify_jwt_in_request()
    current_user = get_jwt_identity()
    print("gwt header", get_jwt())
    print("auts", auts)
    print("current user", current_user)
    
    all_goals = storage.all(Goal).values()
    list_goals = []
    for goal in all_goals:
        goal_dict = goal.to_dict()
        goal_dict['all_tasks'] = [task.to_dict() for task in goal.tasks]
        goal_dict['all_members'] = [member.to_dict() for member in goal.members]
        goal_dict['all_collaborations'] = [collaboration.to_dict() for collaboration in goal.collaborations]
        goal_dict['all_projects'] = [project.to_dict() for project in goal.projects]
        
        list_goals.append(goal_dict)
    return jsonify(list_goals)


@app_views.route('/goals/<goal_id>', methods=['GET'], strict_slashes=False)
def get_goal(goal_id):
    """ Retrieves a specific Goal """
    goal = storage.get(Goal, goal_id)
    if not goal:
        abort(404)
        
    goal_dict = goal.to_dict()
    goal_dict['all_tasks'] = [task.to_dict() for task in goal.tasks]
    goal_dict['all_members'] = [member.to_dict() for member in goal.members]
    goal_dict['all_collaborations'] = [collaboration.to_dict() for collaboration in goal.collaborations]
    goal_dict['all_projects'] = [project.to_dict() for project in goal.projects]
        

    return jsonify(goal_dict)


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
    user_id = data['creator_id']
    user = storage.get(User, user_id)
    new_goal = Goal(**data)
    new_goal.save()
    new_goal_member = Goal_member(user_id=user_id, goal_id=new_goal.id, start_date=new_goal.created_at)
    new_goal_member.save()
    return make_response(jsonify(new_goal.to_dict()), 201)


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
