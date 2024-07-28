#!/usr/bin/python3
""" objects that handles all default RestFul API actions for tasks """
from models.check_list_item import ChecklistItem
from models.task import Task
from models.project import Project
from models.project import Project
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/tasks', methods=['GET'], strict_slashes=False)
def get_all_tasks():
    """
    Retrieves the list of all tasks.
    """
    tasks = storage.all(Task).values()
    
    if not tasks:
        abort(404)

    task_dicts = [task.to_dict() for task in tasks]

    return jsonify(task_dicts)

@app_views.route('/projects/<project_id>/tasks', methods=['GET'],
                 strict_slashes=False)
def get_tasks(project_id):
    """
    Retrieves the list of all tasks objects
    of a specific Project, or a specific project
    """
    list_tasks = []
    project = storage.get(Project, project_id)
    if not project:
        abort(404)
    for task in project.tasks:
        list_tasks.append(task.to_dict())

    return jsonify(list_tasks)


@app_views.route('/tasks/<task_id>/', methods=['GET'], strict_slashes=False)
def get_task(task_id):
    """
    Retrieves a specific task based on id
    """
    task = storage.get(Task,task_id)
    if not task:
        abort(404)
    return jsonify(task.to_dict())


@app_views.route('/tasks/<task_id>', methods=['DELETE'], strict_slashes=False)
def delete_task(task_id):
    """
    Deletes a task based on id provided
    """
    task = storage.get(Task, task_id)

    if not task:
        abort(404)
    storage.delete(task)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/projects/<project_id>/tasks', methods=['POST'],
                 strict_slashes=False)
def create_task(project_id):
    """
    Creates a task for a project
    """
    project = storage.get(Project, project_id)
    if not project:
        abort(404)

    if not request.is_json:
        abort(400, description="Request must be in JSON format")

    if 'name' not in request.json:
        abort(400, description="Task name is missing")

    task_data = request.json
    task = Task(**task_data)
    task.project_id = project_id
    task.goal_id = project.goal_id
    

    checklists = task_data.get('checklist_items', [])
    for checklist in checklists:
        checklist_item = ChecklistItem(**checklist)
        checklist_item.task_id = task.id
        checklist_item.save()
    task.save()
    return (jsonify(task.to_dict()), 201)
@app_views.route('/projects/<project_id>/tasks', methods=['POST'],
                 strict_slashes=False)
def post_task(project_id):
    """
    Creates a Project
    """
    
    project = storage.get(Project, project_id)
    if not project:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")
   

    data = request.get_json()
    new_task = Task(**data)
    new_task.project_id = project_id
    new_task.goal_id = project.goal_id
    new_task.save()
    
    checklists = data['checklist_items']
    for checklist in checklists:
        new_checklist = ChecklistItem(**checklist)
        new_checklist.task_id = new_task.id
        new_checklist.save()
    
    return make_response(jsonify(new_task.to_dict()), 201)


@app_views.route('/tasks/<task_id>', methods=['PUT'], strict_slashes=False)
def put_task(task_id):
    """
    Updates a task
    """
    task = storage.get(Task, task_id)
    if not task:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'goal_id', 'collab_id', 'task_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(task, key, value)
    storage.save()
    return make_response(jsonify(task.to_dict()), 200)
