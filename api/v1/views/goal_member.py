#!/usr/bin/python3
""" objects that handles all default RestFul API actions for goal_members """
from models.collaboration import Collaboration
from models.goal_member import Goal_member
from models.goal import Goal
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from




@app_views.route('/goals/<goal_id>/goal_members', methods=['GET'],
                 strict_slashes=False)
def get_goal_members(goal_id):
    """
    Retrieves the list of all goal_members objects
    of a specific Goal_member, or a specific collaboration
    """
    list_goal_members = []
    goal = storage.get(Goal, goal_id)
    if not goal:
        abort(404)
    for member in goal.members:
        list_goal_members.append(member.to_dict())

    return jsonify(list_goal_members)


# @app_views.route('/goal_members/<collaboration_id>/', methods=['GET'], strict_slashes=False)
# def get_collaboration(collaboration_id):
#     """
#     Retrieves a specific collaboration based on id
#     """
#     collaboration = storage.get(Collaboration, collaboration_id)
#     if not collaboration:
#         abort(404)
#     return jsonify(collaboration.to_dict())


# @app_views.route('/goal_members/<collaboration_id>', methods=['DELETE'], strict_slashes=False)
# def delete_collaboration(collaboration_id):
#     """
#     Deletes a collaboration based on id provided
#     """
#     collaboration = storage.get(Collaboration, collaboration_id)

#     if not collaboration:
#         abort(404)
#     storage.delete(collaboration)
#     storage.save()

#     return make_response(jsonify({}), 200)


# @app_views.route('/goals/<goal_id>/goal_members', methods=['POST'],
#                  strict_slashes=False)
# def post_collaboration(goal_id):
#     """
#     Creates a Collaboration
#     """
    
#     goal = storage.get(Goal_member, goal_id)
#     if not goal:
#         abort(404)
#     if not request.get_json():
#         abort(400, description="Not a JSON")
#     if 'name' not in request.get_json():
#         abort(400, description="Missing name")
   

#     data = request.get_json()
#     instance = Collaboration(**data)
#     instance.goal_id = goal.id
#     instance.save()
#     return make_response(jsonify(instance.to_dict()), 201)


# @app_views.route('/goal_members/<collaboration_id>', methods=['PUT'], strict_slashes=False)
# def put_collaboration(collaboration_id):
#     """
#     Updates a Collaboration
#     """
#     collaboration = storage.get(Collaboration, collaboration_id)
#     if not collaboration:
#         abort(404)

#     if not request.get_json():
#         abort(400, description="Not a JSON")

#     ignore = ['id', 'goal_id', 'created_at', 'updated_at']

#     data = request.get_json()
#     for key, value in data.items():
#         if key not in ignore:
#             setattr(collaboration, key, value)
#     storage.save()
#     return make_response(jsonify(collaboration.to_dict()), 200)
