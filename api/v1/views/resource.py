#!/usr/bin/python3
""" objects that handles all default RestFul API actions for resources """
from api.v1.views.helper_functions import get_user_id_from_all_user
from models.collaboration import Collaboration
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request

from models.resource import Resource





@app_views.route('/resources', methods=['GET'], strict_slashes=False)
def get_all_resources():
    """
    Retrieves the list of all resources.
    """
    all_resources = storage.all(Resource).values()
    formatted_resources = [resource.to_dict() for resource in all_resources]
    return jsonify(formatted_resources)


@app_views.route('/collaborations/<collaboration_id>/resources', methods=['GET'],
                 strict_slashes=False)
def get_resources(collaboration_id):
    """
    Retrieves the list of all resources objects
    of a specific Goal, or a specific collaboration
    """
    list_resources = []
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404)
    for resource in collaboration.resources:
        list_resources.append(resource.to_dict())

    return jsonify(list_resources)


@app_views.route('/resources/<resource_id>/', methods=['GET'], strict_slashes=False)
def get_resource(resource_id):
    """
    Retrieves a specific resources based on id
    """
    resource = storage.get(Resource, resource_id)
    if not resource:
        abort(404)
    return jsonify(resource.to_dict())


@app_views.route('/resources/<resource_id>', methods=['DELETE'], strict_slashes=False)
def delete_resource(resource_id):
    """
    Deletes a resource based on id provided
    """
    resource = storage.get(Resource, resource_id)

    if not resource:
        abort(404)
    storage.delete(resource)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/collaborations/<collaboration_id>/resources', methods=['POST'],
                 strict_slashes=False)
def post_resource(collaboration_id):
    """
    Creates a resource
    """
    collaboration = storage.get(Collaboration, collaboration_id)
    if not collaboration:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'uploader' in request.get_json():
        user_id = request.get_json()['uploader']
    else: 
        user_id = get_user_id_from_all_user(request.get_json())
    if not user_id:
        abort(400, description="Missing user name")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'url' not in request.get_json():
        abort(400, description="Missing url")

    data = request.get_json()
    resource = Resource(**data)
    resource.collaboration_id = collaboration.id
    resource.uploader = user_id
    resource.save()
       
    return make_response(jsonify(resource.to_dict()), 201)


# @app_views.route('/resources/<collaboration_id>', methods=['PUT'], strict_slashes=False)
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
