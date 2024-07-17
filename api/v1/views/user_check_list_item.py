#!/usr/bin/python3
""" objects that handles all default RestFul API actions for task_members """
from models.task import Task
from models.user_check_list_item import UserChecklistItem
from models.check_list_item import ChecklistItem
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.views.helper_functions import get_user_id_from_all_user



@app_views.route('/tasks/user_checklist_items/<user_id>', methods=['GET'], strict_slashes=False)
def get_user_checklist_items(user_id):
    """
    Retrieves the list of checklist items that a user is a member of.
    """
    tasks = storage.all(Task).values()
    user_checklist_items = storage.all(UserChecklistItem).values()

    # Index tasks by ID for efficient lookup
    tasks_by_id = {task.id: task for task in tasks}

    # Filter user_checklist_items first to find those related to the user
    user_related_checklist_items = [checklist_item for checklist_item in user_checklist_items if checklist_item.user_id == user_id]

    # Construct the response with task details and user_checklist_item details
    user_tasks_info = []
    for user_checklist_item in user_related_checklist_items:
        if user_checklist_item.task_id in tasks_by_id:
            task_info = tasks_by_id[user_checklist_item.task_id].to_dict()
            user_checklist_item_info = user_checklist_item.to_dict()
            # Combine task info and user_checklist_item info in the response
            user_tasks_info.append({
                'task': task_info,
                'user_checklist_item': user_checklist_item_info
            })

    return jsonify(user_tasks_info)

@app_views.route('/user_checklist_items', methods=['GET'], strict_slashes=False)
def get_all_user_checklist_items():
    """
    Retrieves the list of all user checklist items.
    """
    user_checklist_items = storage.all(UserChecklistItem).values()

    if not user_checklist_items:
        abort(404)

    user_checklist_item_dicts = [item.to_dict() for item in user_checklist_items]

    return jsonify(user_checklist_item_dicts)

@app_views.route('/checklists/<checklist_id>/user_checklist_items', methods=['GET'], strict_slashes=False)
def get_user_checklist_items(checklist_id):
    """
    Retrieves the list of task members associated with a specific user checklist item.
    """
    task_members = []
    checklist_item = storage.get(ChecklistItem, checklist_id)

    if not checklist_item:
        abort(404)

    for member in checklist_item.members:
        task_members.append(member.to_dict())

    return jsonify(task_members)
    return jsonify(task_members_list)


@app_views.route('/user_checklist_items/<user_checklist_item_id>/', methods=['GET'], strict_slashes=False)
def get_user_checklist_item(user_checklist_item_id):
    """
    Retrieves a specific user checklist item based on id
    """
    user_checklist_item = storage.get(UserChecklistItem, user_checklist_item_id)

    if not user_checklist_item:
        abort(404)

    return jsonify(user_checklist_item.to_dict())


@app_views.route('/user_checklist_items/<user_checklist_item_id>/', methods=['DELETE'], strict_slashes=False)
def delete_user_checklist_item(user_checklist_item_id):
    """
    Deletes a user checklist item based on id provided
    """
    user_checklist_item = storage.get(UserChecklistItem, user_checklist_item_id)

    if not user_checklist_item:
        abort(404)

    try:
        storage.delete(user_checklist_item)
        storage.save()
    except Exception:
        abort(500, description="Error deleting user checklist item")

    return make_response(jsonify({}), 200)


@app_views.route('/checklists/<checklist_id>/user_checklist_items', methods=['POST'],
                 strict_slashes=False)
def create_user_checklist_item(checklist_id):
    """
    Create a user checklist item
    """
    checklist = storage.get(ChecklistItem, checklist_id)
    if not checklist:
        abort(404)

    if not request.is_json:
        abort(400, description="Request body must be a JSON")

    data = request.get_json()
    user_checklist_item = UserChecklistItem(checklist=checklist, **data)
    user_checklist_item.save()

    return make_response(jsonify(user_checklist_item.to_dict()), 201)


@app_views.route('/user_checklist_items/<user_checklist_item_id>', methods=['PUT'], strict_slashes=False)
def update_user_checklist_item(user_checklist_item_id):
    """
    Updates a user checklist item
    """
    user_checklist_item = storage.get(UserChecklistItem, user_checklist_item_id)
    if not user_checklist_item:
        abort(404)

    if not request.get_json():
        abort(400, description="Request body must be a JSON")

    ignore_fields = ['id', 'checklist_item_id', 'user_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore_fields:
            setattr(user_checklist_item, key, value)
    storage.save()
    return make_response(jsonify(user_checklist_item.to_dict()), 200)
