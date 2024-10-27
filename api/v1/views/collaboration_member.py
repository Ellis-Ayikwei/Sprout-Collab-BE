#!/usr/bin/python3
""" objects that handles all default RestFul API actions for collaboration_members """
from colorama import Fore
from api.v1.helpers.helper_functions import get_user_id_from_all_user
from models.collaboration import Collaboration
from models.collaboration_member import Collaboration_member
from models.goal import Goal
from models.goal_member import Goal_member
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.views.user import get_users
from api.v1.views.collaboration import get_collaborations


@app_views.route('/collaborations/mycollaborations/<user_id>', methods=['GET'], strict_slashes=False)
def get_my_collaborations(user_id):
    """
    Retrieves the list of collaborations that a user is a member of.
    """
    collaborations = storage.all(Collaboration).values()
    collaboration_members = storage.all(Collaboration_member).values()

    # Index collaborations by ID for efficient lookup
    collaborations_by_id = {collaboration.id: collaboration for collaboration in collaborations}

    # Filter collaboration_members first to find those related to the user
    user_collaboration_memberships = [collaboration_member for collaboration_member in collaboration_members if collaboration_member.user_id == user_id]

    # Construct the response with collaboration details and collaboration member details
    user_collaborations_info = []
    for collaboration_member in user_collaboration_memberships:
        if collaboration_member.collaboration_id in collaborations_by_id:
            collaboration_info = collaborations_by_id[collaboration_member.collaboration_id].to_dict()
            
            collaboration_member_info = collaboration_member.to_dict()
            # Combine collaboration info and collaboration member info in the response
            user_collaborations_info.append({
                'collaboration': collaboration_info,
                'collaboration_member': collaboration_member_info
            })


    return jsonify(user_collaborations_info)

@app_views.route('/collaboration_members', methods=['GET'], strict_slashes=False)
def get_all_collaboration_members():
    """
    Retrieves the list of all collaboration members.
    """
    collaboration_members = storage.all(Collaboration_member).values()
    if not collaboration_members:
        abort(404)

    collaboration_member_dicts = [
        collaboration_member.to_dict() for collaboration_member in collaboration_members
    ]

    return jsonify(collaboration_member_dicts)


@app_views.route('/collaborations/<collaboration_id>/collaboration_members', methods=['GET'],
                 strict_slashes=False)
@swag_from('docs/Collaboration_member/get_collaboration_member.yml', methods=['GET'])
def get_collaboration_members(collaboration_id):
    """
    Retrieves the list of all collaboration_members objects
    of a specific Collaboration_member, or a specific collaboration
    """
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404, description="Collaboration not found")
    collab_members = [] 
    usernames_and_profiles = []
    
    for member in collaboration.members:
        collab_members.append(member.to_dict())
        user = storage.get(User, member.user_id) 
        if user:
            username = user.username
            profile_pic = user.profile_picture
            usernames_and_profiles.append({
                "username": username,
                "profile_picture": profile_pic
            })
    
   # member_count = len(usernames_and_profiles)
    
  #  if member_count == 0:
       # abort(400, description="No members yet")
    
    return jsonify(collab_members)

# @app_views.route('/collaboration_members/<collaboration_id>/', methods=['GET'], strict_slashes=False)
# def get_collaboration(collaboration_id):
#     """
#     Retrieves a specific collaboration based on id
#     """
#     collaboration = storage.get(Collaboration, collaboration_id)
#     if not collaboration:
#         abort(404)
#     return jsonify(collaboration.to_dict())



# touch api/v1/views/docs/Collaboration/get_collaborations.yml
# touch api/v1/views/docs/Collaboration/get_collaboration.yml
# touch api/v1/views/docs/Collaboration/delete_collaboration.yml
# touch api/v1/views/docs/Collaboration/post_collaboration.yml
# touch api/v1/views/docs/Collaboration/put_collaboration.yml
@app_views.route('/collaborations/<collaboration_id>/members', methods=['DELETE'], strict_slashes=False)
@swag_from('./docs/Collaboration_member/delete_collaboration_member.yml', methods=['DELETE'])
def delete_collaboration_member(collaboration_id):
    """
    Deletes a member from a specific collaboration.
    """
    collaboration = storage.get(Collaboration, collaboration_id)
    
    if not collaboration:
        abort(404, description="Collaboration not found")

    data = request.get_json()
    if not data:
        abort(400, description="Request data is not in JSON format")
    if 'username' not in data:
        abort(400, description="Missing 'username' in request data")

    # Fetch all users to check if the specified username exists
    user_id = get_user_id_from_all_user(data)
    
    if not user_id:
        abort(400, description=f"User '{data['username']}' does not exist")

    # Check if the user is a member of the collaboration and get the member ID
    member_to_delete = None
    for member in collaboration.members:
        if member.user_id == user_id:
            member_to_delete = member
            break

    if not member_to_delete:
        abort(400, description=f"User '{data['username']}' is not a member of this collaboration")

    # Delete the member
    storage.delete(member_to_delete)
    storage.save()

    return make_response(jsonify({}), 204)  # Return a 204 No Content response



@app_views.route('/collaborations/<collaboration_id>/members', methods=['POST'], strict_slashes=False)
@swag_from('docs/Collaboration_member/post_collaboration_member.yml', methods=['POST'])
def post_collaboration_member(collaboration_id: str) -> jsonify:
    """
    Creates a new collaboration member by adding a user to a specific collaboration.
    """

    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404, description="Collaboration not found")

    data = request.get_json()
    if not data:
        abort(400, description="Request data is not in JSON format")
    if 'username' not in data:
        abort(400, description="Missing 'username' in request data")

    user_id = get_user_id_from_all_user(data['username'])
    if not user_id:
        abort(400, description=f"User '{data['username']}' does not exist")

    # Check if the user is already a member of the collaboration
    for member in collaboration.members:
        if member.user_id == user_id:
            abort(400, description=f"User '{data['username']}'1 is already a member of the collaboration")

    # Check if the user is already a Goal_member
    goal_members = storage.all(Goal_member).values()
    if not any(member.user_id == user_id and member.goal_id == collaboration.goal_id for member in goal_members):
        new_goal_member = Goal_member(user_id=user_id, goal_id=collaboration.goal_id)
        new_goal_member.save()
        
    new_member = Collaboration_member(collaboration_id=collaboration_id, user_id=user_id)
    new_member.save()

    return make_response(jsonify(new_member.to_dict({})), 201)



# @app_views.route('/collaboration_members/<collaboration_id>', methods=['PUT'], strict_slashes=False)
# def put_collaboration(collaboration_id):
#     """
#     Updates a Collaboration
#     """
#     collaboration = storage.get(Collaboration, collaboration_id)
#     if not collaboration:
#         abort(404)

#     if not request.get_json():
#         abort(400, description="Not a JSON")

#     ignore = ['id', 'collaboration_id', 'created_at', 'updated_at']

#     data = request.get_json()
#     for key, value in data.items():
#         if key not in ignore:
#             setattr(collaboration, key, value)
#     storage.save()
#     return make_response(jsonify(collaboration.to_dict()), 200)
