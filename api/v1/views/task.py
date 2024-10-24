#!/usr/bin/python3
""" objects that handles all default RestFul API actions for tasks """
from models.check_list_item import ChecklistItem
from models.collaboration import Collaboration
from models.project_member import Project_member
from models.task import Task
from models.project import Project
from models.project import Project
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from

from models.task_member import Task_member
from models.user import User
from models.user_check_list_item import UserChecklistItem


@app_views.route('/tasks', methods=['GET'], strict_slashes=False)
def get_all_tasks():
    """
    Retrieves the list of all tasks.
    """
    tasks = storage.all(Task).values()
    
    if len(tasks) == 0:
        return jsonify([])
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
        task_dict = task.to_dict()
        task_dict['all_members'] = [member.to_dict() for member in task.members]
        task_dict['all_checklists'] = [checklist.to_dict() for checklist in task.checklist_items]
        list_tasks.append(task_dict)

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
def post_task(project_id):
    """
    Creates a Task
    """
    project = storage.get(Project, project_id)
    if not project:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    if 'name' not in data:
        abort(400, description="Missing name")
    print("the data is", data)
    
    
    new_task = Task(**data)
    new_task.save()
    
    checklists = data.get('checklists', [])
    new_checklists = []
    for checklist in checklists:
        new_checklist = ChecklistItem(**checklist)
        new_checklist.task_id = new_task.id
        new_checklist.save()
        new_checklists.append(new_checklist)
        
    collaboration = storage.get(Collaboration, project.collab_id)
    for member in collaboration.members:
        user = storage.get(User, member.user_id)
        if not user:
            abort(400, description=f"User with ID {member.user_id} does not exist")

        new_task_member = Task_member(
            project_id=project_id,
            task_id=new_task.id,
            user_id=member.user_id
        )
        new_task_member.save()
        
        for new_checklist in new_checklists:
            new_user_checklist_item = UserChecklistItem(
                user_id=member.user_id,
                checklist_item_id=new_checklist.id,
                task_id=new_task.id,
                task_member_id=new_task_member.id
            )
            new_user_checklist_item.save()
       
    
    

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
