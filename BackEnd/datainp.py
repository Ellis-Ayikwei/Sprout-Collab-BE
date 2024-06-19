from models.goal import Goal
from models import storage
from models.goal_type import Goal_type
from datetime import datetime as dt 
from models.user import User

# # add some goals
# num_goals = 5 

# for i in range(num_goals):
#   # Create a new Goal object with unique data (modify as needed)
#     new_goal = Goal(
#         name=f"Sample Goal {i+1}",
#         description=f"This is a sample goal description for goal {i+1}",
#         target_completion_date=dt(year=2024, month=8, day=1+i),  
#         is_public=True if i % 2 == 0 else False,  
#         type="00785880-8177-4338-8aa1-176774db5592"
#     )
#     new_goal.save()

# print(f"{num_goals} goals successfully inserted!")



# #to insert items into goal_types

# # Predefined goal type names
# goal_types = [
#     "Personal", "Professional", "Financial", "Health & Fitness",
#     "Education", "Travel", "Relationships", "Creative",
#     "Productivity", "Community", "Environmental", "Social Justice",
#     "Spiritual", "Relaxation", "Adventure", "Learning",
#     "Career Development", "Family", "Wellbeing"
# ]

# def get_placeholder_description(name):
#   return f"Goals related to {name}"

# for goal_type in goal_types:
#   name = goal_type
  
#   description = get_placeholder_description(name) 

#   new_goal_type = Goal_type(name=name, description=description)
#   storage.new(new_goal_type)
#   storage.save()


# print(f"{goal_types} goal types successfully inserted!")

 
# # Create some User objects with sample data
# for i in range(10):
#     new_user = User(
#         username=f"user No.{i}",
#         email= f"userNo.{i}@example.com",
#         password= f"passwordforuserNo.{i}"
#     )
#     new_user.save()


# print(f"users successfully inserted!")


from models.collaboration import Collaboration

# Sample user and goal IDs (replace with actual IDs from your database)
user_ids = ['159f91d7-5dc3-47c1-9eb0-40bc22f6166d', '211ba7e8-1c77-4501-b9ef-e50cf78494de',
            '32963ad9-0401-4593-b277-0f4d1a5614e2', '3f7a9a15-94e5-4245-b0c3-fd211f505618',
            '48272010-8ffd-449c-bfd1-d2dff4258d8d', '944c59fc-2fb1-4ecd-8fc1-017c63b45db4',
            'aa7af7b0-5014-4df2-a221-7190ea82339c', 'bdcc4ad0-d667-40fc-b14b-98ed6fbe711a',
            'e7c37155-933a-4ff4-a0c0-cbefdab83716', 'fe917f89-c80d-405b-a513-3cc7a0177925']

goal_ids = ['04bb3a77-baf0-4225-9763-ce15a3ef7ecb', '0f389076-d273-46f7-9576-f4893b8df5f6',
            '22665a6c-8860-434a-8ac3-5a150831839b', '297d90e9-962a-413c-9050-4ba7aff00f80',
            '3666d67f-85e0-4b4e-99ec-e79e8c340791', '37dd1554-5713-41e6-9dbb-5db8bb04ff11',
            '793fcde8-30f7-4278-a8d7-fe56f7d98de4', '9c5b3c87-5303-45b0-acf2-3832a1b035c2',
            'a88de733-780f-45c8-963c-4775fe90b5c6', 'a8fad78e-a9ca-4df2-b6a1-bf31370e8a30',] 

# Create some Collaboration objects with sample data
for i in range(10):
    new_collab = Collaboration(collaborator_id=user_ids[i],
                             goal_id=goal_ids[i],
                             is_public=True if i % 2 == 0 else False,
                             description=f"Helping John achieve his personal goal{i}")
    new_collab.save()

print(f"collaborations successfully inserted!")

# userids = storage.all(Goal)

# keys = []
# for k,v in userids.items():
#     key = k.split(".")[-1]
#     keys.append(key)
    
# print(keys)
