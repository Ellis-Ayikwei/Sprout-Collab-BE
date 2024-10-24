#!/usr/bin/python3
""" objects that handles all default RestFul API actions for task_members """
from models.task import Task
from models.task_member import Task_member
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.helpers.helper_functions import get_user_id_from_all_user



@app_views.route('/tasks/mytasks/<user_id>', methods=['GET'], strict_slashes=False)
def get_my_tasks(user_id):
    """
    Retrieves the list of tasks that a user is a member of.
    """
    tasks = storage.all(Task).values()
    task_members = storage.all(Task_member).values()

    # Index tasks by ID for efficient lookup
    tasks_by_id = {task.id: task for task in tasks}

    # Filter task_members first to find those related to the user
    user_task_members = [task_member for task_member in task_members if task_member.user_id == user_id]

    # Construct the response with task details and task member details
    user_tasks_info = []
    for task_member in user_task_members:
        if task_member.task_id in tasks_by_id:
            task_info = tasks_by_id[task_member.task_id].to_dict()
            task_member_info = task_member.to_dict()
            # Combine task info and task member info in the response
            user_tasks_info.append({
                'task': task_info,
                'task_member': task_member_info
            })

    return jsonify(user_tasks_info)

@app_views.route('/task_members', methods=['GET'], strict_slashes=False)
def get_all_task_members():
    """
    Retrieves the list of all task members.
    """
    task_members = storage.all(Task_member).values()

    if not task_members:
        abort(404)

    task_member_dicts = [task_member.to_dict() for task_member in task_members]

    return jsonify(task_member_dicts)

@app_views.route('/tasks/<task_id>/task_members', methods=['GET'],
                 strict_slashes=False)
def get_task_members(task_id):
    """
    Retrieves the list of all task_members objects
    of a specific Task_member, or a specific task_member
    """
    list_task_members = []
    task = storage.get(Task, task_id)
    if not task:
        abort(404)
    for member in task.members:
        list_task_members.append(member.to_dict())

    return jsonify(list_task_members)


@app_views.route('/task_members/<task_member_id>/', methods=['GET'], strict_slashes=False)
def get_task_member(task_member_id):
    """
    Retrieves a specific task_member based on id
    """
    task_member = storage.get(Task_member, task_member_id)
    if not task_member:
        abort(404)
    return jsonify(task_member.to_dict())


@app_views.route('/task_members/<task_member_id>', methods=['DELETE'], strict_slashes=False)
def delete_task_member(task_member_id):
    """
    Deletes a task_member based on id provided
    """
    task_member = storage.get(Task_member, task_member_id)
    print(task_member)

    if not task_member:
        abort(404)
    
    try:
        storage.delete(task_member)
    except Exception as e:
        print(f"Error deleting task_member: {e}")
        abort(500, description="Error deleting task member")
    
    try:
        storage.save()
    except Exception as e:
        print(f"Error saving changes: {e}")
        abort(500, description="Error saving changes")

    return make_response(jsonify({}), 200)


@app_views.route('/tasks/<task_id>/task_members', methods=['POST'],
                 strict_slashes=False)
def post_task_member(task_id):
    """
    Creates a Task_member
    """
    
    task = storage.get(Task, task_id)
    if not task:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    user_id = get_user_id_from_all_user(request.get_json())
   

    data = request.get_json()
    new_task_member = Task_member(**data)
    new_task_member.task_id = task.id
    new_task_member.user_id = user_id
    new_task_member.goal_id = task.goal_id
    new_task_member.project_id = task.project_id
    new_task_member.save()
    return make_response(jsonify(new_task_member.to_dict()), 201)


@app_views.route('/task_members/<task_member_id>', methods=['PUT'], strict_slashes=False)
def put_task_member(task_member_id):
    """
    Updates a Task
    """
    task_member = storage.get(Task_member, task_member_id)
    if not task_member:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'task_id', 'goal_id', 'project_id', 'task_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(task_member, key, value)
    storage.save()
    return make_response(jsonify(task_member.to_dict()), 200)
