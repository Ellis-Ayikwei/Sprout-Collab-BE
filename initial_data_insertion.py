#!/usr/bin/python3
from colorama import init, Fore, Style
from models.task import Task
from models.goal import Goal
from models.goal_member import Goal_member
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
from models.check_list_item import ChecklistItem

#storage.close()
init(autoreset=True)

storage.reload()

def add_new_users():
    for i in range(30):
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
    print(f"{Fore.BLUE}users successfully inserted!")

def add_new_goal_type(goal_types):
    print(f"adding new goal type")
    for goal_type in goal_types:
        print(goal_type)

    def get_placeholder_description(name):
        return f"Goals related to {name}"

    for goal_type in goal_types:
        # Create a new Goal_type object with unique data (modify as needed)
        print(f"adding new goal type {goal_type}")
        name = goal_type
        description = get_placeholder_description(name) 
        new_goal_type = Goal_type(name=name, description=description)
        new_goal_type.save()
      
    print(f"{Fore.BLUE}goal types successfully inserted!")



########################################




# #create some goals
 
def add_goals(goal_type_ids):
    for i in range(len(goal_type_ids)):
  # Create a new Goal object with unique data (modify as needed)
        new_goal = Goal(
            name=f"Sample Goal {i+1}",
            description=f"This is a sample goal description for goal {i+1}",
            target_completion_date=dt(year=2024, month=8, day=1+i),  
            is_public=True if i % 2 == 0 else False,  
            type= goal_type_ids[i]
        )
        new_goal.save()

    print(f"{Fore.BLUE}goals successfully inserted!")




# ###################################################

 



# Create some Collaboration objects with sample data
def add_collab(user_ids, goal_ids):
    for i in range(len(goal_ids)):
        new_collab = Collaboration(admin_id=user_ids[i],
                             goal_id=goal_ids[i],
                             is_public=True if i % 2 == 0 else False,
                             description=f"Helping John achieve his personal goal{i}")
        new_collab.save()

    print(f"{Fore.BLUE}collaborations successfully inserted!")

def add_a_collab(user_ids):
    for i in range(len(user_ids)):
        new_collab = Collaboration(admin_id=user_ids[i],
                             goal_id='307b1215-63f3-401f-8502-366da1eff53e',
                             is_public=True if i % 2 == 0 else False,
                             description=f"Helping John achieve his personal goal{i}")
        new_collab.save()

    print(f"{Fore.BLUE}collaborations successfully inserted!")





def add_projects(goal_ids, collab_ids):
    for i in range(len(goal_ids)):
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
    print(f"{Fore.BLUE}projects added successfully")

def add_a_projects(goal_ids):
    for i in range(len(goal_ids)):
        new_prject = Project(
            name=f"Sample Project {i+1}",
            description=f"This is a sample project description for project {i+1}",
            collab_id = '0f4b802f-1b2b-4ee9-9df9-ef34475a1282',
            goal_id='2d1aaad9-7237-4fca-beb2-2f87ab684e75',
            is_public=True if i % 2 == 0 else False,
            start_date=dt(year=2024, month=7, day=1+i),
            end_date=dt(year=2024, month=8, day=1+i)
        )
        new_prject.save()
    print(f"{Fore.BLUE}projects added successfully")

def add_project_member(project_ids,user_ids, goal_ids):
    for i in range(len(project_ids)):
        new_project_member = Project_member(
                project_id = project_ids[i],
                goal_id = goal_ids[i],
                user_id = user_ids[i]
        )
        new_project_member.save()
    print(f"{Fore.BLUE}project members added sucessfully")

def add_a_project_member():
    new_project_member = Project_member(
            project_id = "2989eb26-3f9d-4d77-911d-9e45622d2731",
            goal_id = "f0167af6-919c-4ad2-a4d0-ea594830f2df",
            user_id = "1857a37b-0afe-4ceb-a05f-867fa9918de7"
    )
    new_project_member.save()
    print(f"{Fore.BLUE}project members added sucessfully")






def add_new_resource(user_ids, collab_ids):
    for i in range(len(collab_ids)):
        new_resource = Resource(
            name=f"Sample Resource {i+1}",
            description=f"This is a sample resource description for resource {i+1}",
            collaboration_id = collab_ids[i],
            url=f"http://the_for_{i}",
            uploader=user_ids[i],
            visible=True if i % 2 == 0 else False,
        )
        new_resource.save()
    print(f"{Fore.BLUE}resources added successfully")
        
        
def new_task(user_ids, goal_ids, project_ids ):
    for i in range(len(project_ids)):
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
    print(f"{Fore.BLUE}tasks added successfully")

def new_task_member(task_ids, user_ids, project_ids):
    for i in range(len(task_ids)):
        new_task_member = Task_member(
            user_id=user_ids[i],
            task_id=task_ids[i],
            project_id = project_ids[i]
        )
        new_task_member.save()
    print(f"{Fore.BLUE}new task member added")
    
def new_a_task_member():
    new_task_member = Task_member(
        user_id="1857a37b-0afe-4ceb-a05f-867fa9918de7",
        task_id="23b02210-59ec-412a-a5ed-0a6680922a22",
        project_id = "2989eb26-3f9d-4d77-911d-9e45622d2731"
    )
    new_task_member.save()
    print(f"{Fore.BLUE}new task member added")


def new_collab_m(user_ids, collab_ids):
    for i in range(len(collab_ids)):
        new_collab_m = Collaboration_member(
            user_id = user_ids[i],
            collaboration_id = collab_ids[i]
        )
       
        new_collab_m.save()
        new_goal_m =  Goal_member(
            user_id =user_ids[i],
            goal_id = new_collab_m.collaborations.goal_id 
        )
        new_goal_m.save()
    print(f"{Fore.BLUE}new c member added")

def add_collab_m(user_id, collab_id):
     new_collab_m = Collaboration_member(
         user_id = user_id,
         collaboration_id = collab_id
     )

     new_collab_m.save()
     new_goal_m =  Goal_member(
         user_id =user_id,
         goal_id = new_collab_m.collaborations.goal_id
     )
     new_goal_m.save()
     print(f"{Fore.BLUE}new c member added")
     
def add_checklist_item(user_ids):
    for i in range(10):
        new_chl = ChecklistItem(
            task_id= user_ids[i],
            description= f"description for task no. {i}" ,
            is_completed = True if i % 2 == 0 else False,
        )

        new_chl.save()
    
   
    print(f"{Fore.BLUE}new c member added")


if __name__ == "__main__":
    
    try:

        goal_types = [
            "Personal", "Professional", "Financial", "Health & Fitness",
            "Education", "Travel", "Relationships", "Creative",
            "Productivity", "Community", "Environmental", "Social Justice",
            "Spiritual", "Relaxation", "Adventure", "Learning",
            "Career Development", "Family", "Wellbeing"
        ]


       # add_new_users()
        users = storage.all(User).items()
        user_ids = [k.split(".")[-1] for k,v  in users]


        #add_new_goal_type(goal_types)
        goal_types = storage.all(Goal_type).items()
        goal_type_ids = [k.split(".")[-1] for k,v  in goal_types]


        #add_goals(goal_type_ids)
        goals = storage.all(Goal).items()
        goal_ids = [k.split(".")[-1] for k,v  in goals]




        #add_collab(user_ids, goal_ids)
        collabs =storage.all(Collaboration).items()
        collab_ids = [k.split(".")[-1] for k,v  in collabs]

        
        #new_collab_m(user_ids, collab_ids)
        
       # add_new_resource(user_ids, collab_ids)


       # add_projects(goal_ids, collab_ids)
        projects = storage.all(Project).items()
        project_ids = [k.split(".")[-1] for k,v  in projects]

        #add_project_member(project_ids, user_ids, goal_ids)


        #new_task(user_ids, goal_ids, project_ids)
        tasks = storage.all(Task).items()
        task_ids = [k.split(".")[-1] for k,v  in tasks]

        #new_task_member(task_ids, user_ids, project_ids)
        
       # add_collab_m("2e26b04d-4ada-4807-94f7-611d035a9242", collab_ids[4])
        # add_a_collab(user_ids)
        #add_a_projects(goal_ids)
        # add_a_project_member()
        # new_a_task_member()
        add_checklist_item(user_ids)
    except Exception as e:
        print(f"{Fore.RED}failed {e}")
    else:
        print(f"\n\n{Style.BRIGHT}{Fore.GREEN}The code processed successfully........\n\n")
      
    
   
