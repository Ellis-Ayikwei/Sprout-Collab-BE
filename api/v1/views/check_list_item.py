#!/usr/bin/python3
""" objects that handles all default RestFul API actions for tasks """
from models.task import Task
from models.project import Project
from models.check_list_item import ChecklistItem
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/checklist', methods=['GET'], strict_slashes=False)
def get_all_checklist_items():
    """Retrieves the list of all checklist items."""
    checklist_items = storage.all(ChecklistItem).values()

    if not checklist_items:
        abort(404)

    checklist_items_dicts = [item.to_dict() for item in checklist_items]

    return jsonify(checklist_items_dicts)

@app_views.route('/task/<task_id>/checklists', methods=['GET'],
                 strict_slashes=False)
def get_checklist_items(task_id):
    """
    Retrieves the list of all checklist items for a specific task.
    """
    checklist_items = []
    task = storage.get(Task, task_id)
    if not task:
        abort(404)
    for checklist_item in task.checklist_items:
        checklist_items.append(checklist_item.to_dict())

    return jsonify(checklist_items)


@app_views.route('/checklist_items/<checklist_item_id>/', methods=['GET'], strict_slashes=False)
def get_checklist_item(checklist_item_id):
    """
    Retrieves a specific checklist item based on id
    """
    checklist_item = storage.get(ChecklistItem, checklist_item_id)
    if not checklist_item:
        abort(404)
    return jsonify(checklist_item.to_dict())


@app_views.route('/checklist_items/<checklist_item_id>/', methods=['DELETE'], strict_slashes=False)
def delete_checklist_item(checklist_item_id):
    """
    Deletes a checklist item based on id provided
    """
    checklist_item = storage.get(ChecklistItem, checklist_item_id)

    if not checklist_item:
        abort(404)

    storage.delete(checklist_item)

    storage.save()

    return jsonify({}), 200


@app_views.route('/task/<task_id>/checklist', methods=['POST'], strict_slashes=False)
def create_checklist_item(task_id):
    """
    Creates a checklist item for a task
    """
    task = storage.get(Task, task_id)
    
    if not task:
        abort(404)

    if not request.get_json():
        abort(400, description="Request body must be a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Name is missing from request body")

    data = request.get_json()
    checklist_item = ChecklistItem(name=data['name'],
                                   task_id=task_id,
                                   goal_id=task.goal_id)
    checklist_item.save()
    task.checklist_items.append(checklist_item)
    task.save()

    return make_response(jsonify(checklist_item.to_dict()), 201)


@app_views.route('/checklists/<checklist_id>', methods=['PUT'], strict_slashes=False)
def update_checklist(checklist_id):
    """
    Updates a checklist item
    """
    checklist_item = storage.get(ChecklistItem, checklist_id)

    if not checklist_item:
        abort(404)

    if not request.get_json():
        abort(400, description="Request body must be a JSON")

    ignore_fields = ['id', 'task_id', 'goal_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore_fields:
            setattr(checklist_item, key, value)

    checklist_item.save()

    return make_response(jsonify(checklist_item.to_dict()), 200)
