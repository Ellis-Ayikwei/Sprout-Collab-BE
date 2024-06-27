#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves the list of all User objects
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """ Retrieves a specific User """
    from api.v1.views.helper_functions import get_user_id_from_all_user
    
    if user_id is None:
        print("no user id entered user the helper function")
        user_id = get_user_id_from_all_user()
    
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    
    return jsonify(user.to_dict())


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a User Object
    """

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def post_user():
    """
    Creates a User
    """
    from api.v1.views.helper_functions import is_username_already_taken

    data = request.get_json()
    if not data:
        abort(400, description="Not a JSON")
    if 'username' not in data or not isinstance(data['username'], str):
        abort(400, description="Invalid or missing username")
    
    if is_username_already_taken(data):
        abort(400, description="Sorry, username already taken. Please choose another one.")
    if 'password' not in data or not isinstance(data['password'], str):
        abort(400, description="Invalid or missing password")

    new_user = User(**data)
    new_user.save()

    # # Logging user creation attempt
    # if new_user.id:
    #     logging.info(f"User created successfully with id: {new_user.id}")
    # else:
    #     logging.error("Failed to create user")

    return make_response(jsonify(new_user.to_dict()), 201)


@app_views.route('/users/', methods=['PUT'], strict_slashes=False)
#@swag_from('documentation/user/put_user.yml', methods=['PUT'])
def put_user():
    """
    Updates a User
    """
    from api.v1.views.helper_functions import get_user_id_from_all_user

    data = request.get_json()
    user_id=get_user_id_from_all_user(data)
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not data:
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)
