#!/usr/bin/python3
""" objects that handles all default RestFul API actions for project_members """
from models.project import Project
from models.collaboration import Collaboration
from models.project_member import Project_member
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from



@app_views.route('/project/myprojects/<user_id>', methods=['GET'], strict_slashes=False)
def get_my_projects(user_id):
    """
    Retrieves the list of projects that a user is a member of, along with the project member data.
    """
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    print("the usr id is", user_id)
    projects = storage.all(Project).values()
    project_members = storage.all(Project_member).values()

    # Index projects by ID for efficient lookup
    projects_by_id = {project.id: project for project in projects}

    # Filter project_members first to find those related to the user
    user_project_members = filter(lambda p_m: p_m.user_id == user_id, project_members)

    # Construct the response with project details and project member details
    user_projects_info = []
    for project_member in user_project_members:
        if project_member.project_id in projects_by_id:
            project_info = projects_by_id[project_member.project_id].to_dict()
            project_member_info = project_member.to_dict()
            # Combine project info and project member info in the response
            user_projects_info.append({
                'project': project_info,
                'project_member': project_member_info
            })


    print("the usr proj info", user_projects_info)
    print("the usr proj info", user_projects_info)
    print("the usr proj info", user_projects_info)
    print("the usr proj info", user_projects_info)
    print("the usr proj info", user_projects_info)
    print("the usr proj info", user_projects_info)
    print("the usr proj info", user_projects_info)
    return jsonify(user_projects_info)


@app_views.route('/project_members', methods=['GET'], strict_slashes=False)
def get_all_project_members():
    """
    Retrieves the list of all project members.
    """
    project_members = storage.all(Project_member).values()

    if not project_members:
        return jsonify([])

    project_member_dicts = [project_member.to_dict() for project_member in project_members]

    return jsonify(project_member_dicts)


@app_views.route('/projects/<project_id>/project_members', methods=['GET'],
                 strict_slashes=False)
def get_project_members(project_id):
    """
    Retrieves the list of all project_members objects
    of a specific Project_member, or a specific project
    """
    list_project_members = []
    project = storage.get(Project, project_id)
    if not project:
        abort(404)
    for member in project.members:
        list_project_members.append(member.to_dict())

    return jsonify(list_project_members)


@app_views.route('/project_members/<project_member_id>/', methods=['GET'], strict_slashes=False)
def get_project_member(project_member_id):
    """
    Retrieves a specific project based on id
    """
    project_member = storage.get(Project_member, project_member_id)
    if not project_member:
        abort(404)
    return jsonify(project_member.to_dict())


@app_views.route('/project_members/<project_member_id>', methods=['DELETE'], strict_slashes=False)
def delete_project_member(project_member_id):
    """
    Deletes a project based on id provided
    """
    project_member = storage.get(Project_member, project_member_id)

    if not project_member:
        abort(404)
    storage.delete(project_member)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/projects/<project_id>/project_members', methods=['POST'],
                 strict_slashes=False)
def post_project_member(project_id):
    """
    Creates a Collaboration
    """
    
    project = storage.get(Project, project_id)
    if not project:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")
   

    data = request.get_json()
    instance = Collaboration(**data)
    instance.project_id = project.id
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


# @app_views.route('/project_members/<project_id>', methods=['PUT'], strict_slashes=False)
# def put_project_member(project_id):
#     """
#     Updates a Collaboration
#     """
#     project = storage.get(Collaboration, project_id)
#     if not project:
#         abort(404)

#     if not request.get_json():
#         abort(400, description="Not a JSON")

#     ignore = ['id', 'project_id', 'created_at', 'updated_at']

#     data = request.get_json()
#     for key, value in data.items():
#         if key not in ignore:
#             setattr(project, key, value)
#     storage.save()
#     return make_response(jsonify(project.to_dict()), 200)
