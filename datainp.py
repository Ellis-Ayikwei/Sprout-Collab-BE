#!/usr/bin/python3
from models.task import Task
from models.goal import Goal
from models import storage
from models.goal_type import Goal_type
from datetime import date as dt
from models.project import Project
from models.resource import Resource
from models.task_member import Task_member
from models.user import User
from models.collaboration import Collaboration
from models.collaboration_member import Collaboration_member
from models.project_member  import Project_member

#storage.close()
storage.reload()
num_goals = 10


def add_new_users():
    userlen=storage.count(User)
# Create some User objects with sample data
    for i in range(userlen+1,userlen+10 ):
        new_user = User(
        first_name = f"{i}FirstName",
        last_name = f"{i}LasttName",
        skills = ["js", "debugging", "machine", "learning"],
        profile_picture="profile_picture_for_user" + str(i),
        username=f"user No.{i}",
        email= f"userNo.{i}@example.com",
        password= f"passwordforuserNo.{i}"
    )
    
    
        new_user.save()
        skilllist=new_user.skills
        print(f"skillist for{new_user.username}:{skilllist}")
    print(f"users successfully inserted!")

#add_new_users()


# #######################################


#insert items into goal_types

#Predefined goal type names

goal_types = [
    "Personal", "Professional", "Financial", "Health & Fitness",
    "Education", "Travel", "Relationships", "Creative",
    "Productivity", "Community", "Environmental", "Social Justice",
    "Spiritual", "Relaxation", "Adventure", "Learning",
    "Career Development", "Family", "Wellbeing"
]

def add_new_goal_type(goal_types):
    def get_placeholder_description(name):
      return f"Goals related to {name}"

    for goal_type in goal_types:
      name = goal_type
  
      description = get_placeholder_description(name) 

      new_goal_type = Goal_type(name=name, description=description)
      storage.new(new_goal_type)
      storage.save()


    print(f"{goal_types} goal types successfully inserted!")

#add_new_goal_type(goal_types)

########################################




# #create some goals
 
def add_goals(num_goals):
    for i in range(num_goals):
  # Create a new Goal object with unique data (modify as needed)
        new_goal = Goal(
            name=f"Sample Goal {i+1}",
            description=f"This is a sample goal description for goal {i+1}",
            target_completion_date=dt(year=2024, month=8, day=1+i),  
            is_public=True if i % 2 == 0 else False,  
            type="3cc268fd-fc21-4fab-b2d6-1d0a70a0da19"
        )
        new_goal.save()

    print(f"{num_goals} goals successfully inserted!")

#add_goals(num_goals)


# ###################################################

 

users = storage.all(User).items()
goals = storage.all(Goal).items()
collabs =storage.all(Collaboration).items()
projects = storage.all(Project).items()
tasks = storage.all(Task).items()
# for k,v in users:
#     userIds.append(k.split(".")[-1])

user_ids = [k.split(".")[-1] for k,v  in users]
goal_ids = [k.split(".")[-1] for k,v  in goals]
collab_ids = [k.split(".")[-1] for k,v  in collabs]
project_ids = [k.split(".")[-1] for k,v  in projects]
task_ids = [k.split(".")[-1] for k,v  in tasks]


# Create some Collaboration objects with sample data
def add_collab(user_ids, goal_ids):
    collablen=storage.count(Collaboration)
    for i in range(10):
        new_collab = Collaboration(admin_id=user_ids[i],
                             goal_id=goal_ids[i],
                             is_public=True if i % 2 == 0 else False,
                             description=f"Helping John achieve his personal goal{i}")
        new_collab.save()

    print(f"collaborations successfully inserted!")

#add_collab(user_ids, goal_ids)


def add_projects(goal_ids, collab_ids):
    for i in range(9):
        new_prject = Project(
            name=f"Sample Project {i+1}",
            description=f"This is a sample project description for project {i+1}",
            collab_id = collab_ids[i],
            goal_id=goal_ids[i],
            is_public=True if i % 2 == 0 else False,
            start_date=dt(year=2024, month=7, day=1+i),
            end_date=dt(year=2024, month=8, day=1+i)
        )
        new_prject.save()
    print("projects added successfully")

def add_project_member(project_ids,user_ids, goal_ids):
    for i in range(9):
        new_project_member = Project_member(
                project_id = project_ids[i],
                goal_id = goal_ids[i],
                user_id = user_ids[i]
        )
        new_project_member.save()
    print("project members added sucessfully")

add_project_member(project_ids,user_ids, goal_ids)

#add_projects( goal_ids, collab_ids)


def add_new_resource(user_ids, collab_ids):
    for i in range(10):
        new_resource = Resource(
            name=f"Sample Resource {i+1}",
            description=f"This is a sample resource description for resource {i+1}",
            collaboration_id = collab_ids[i],
            url=f"http://the_for_{i}",
            uploader=user_ids[i],
            visible=True if i % 2 == 0 else False,
        )
        new_resource.save()
    print("resources added successfully")
        
        
#add_new_resource(user_ids, collab_ids)   


def new_task(user_ids, goal_ids, project_ids ):
    for i in range(10):
        new_task=Task(
            goal_id = goal_ids[i],
            project_id = project_ids[i],
            name = f"the name for task - {i}",
            description = f"the description for task - {i}",
            start_date =  dt(year=2024, month=7, day=1+i),
            end_date =  dt(year=2024, month=8, day=1+i),
            uploader = user_ids[i]
            )
        new_task.save()
    print("tasks added successfully")

#new_task(user_ids, goal_ids, project_ids)

def new_task_member(task_ids, user_ids, project_ids):
    for i in range(10):
        new_task_member = Task_member(
            user_id=user_ids[i],
            task_id=task_ids[i],
            project_id = project_ids[i]
        )
        new_task_member.save()
    print("new task member added")

def new_collab_m(user_ids, collab_ids):
    for i in range(10):
        for j in range(len(user_ids)):
            new_collab_m = Collaboration_member(
                           user_id = user_ids[i],
                           collaboration_id = collab_ids[i]
                           )
            new_collab_m.save()
    print("new c member added")

#new_collab_m(user_ids, collab_ids)

#new_task_member(task_ids, user_ids, project_ids)
#def new_goal_member(user_ids, goal_ids, collab_ids):
 #   for i in range(10):
  #      new_goal_member = Goal_member(
   #             user_id = user_ids[i],
    #            goal_id = goal_ids[i],
     #           collab_id = collab_ids[i]

# ##new collab member
# new_collab_member = Collaboration_member(user_id=user_ids[4], 
#                                          collaboration_id=collab_ids[2])
# new_collab_member.save()
# print("new collab added")


# collab = storage.get(Collaboration, "27a5a3db-2f05-45a3-afd1-76a5d40192ac")

# collaboration = storage.get(Collaboration, "27a5a3db-2f05-45a3-afd1-76a5d40192ac")

# list_collaboration_members = [member.to_dict() for member in collaboration.members]

# col_mem = storage.get(Collaboration_member, "0591809c-10b0-46a9-9c83-5012cf4879b2")
# about_members = col_mem.user
# print(about_members)
# if len(list_collaboration_members) == 0:
#     print("No members in this collaboration yet")
# print(list_collaboration_members)
