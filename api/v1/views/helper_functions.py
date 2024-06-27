from api.v1.views.user import get_users


def get_user_id_from_all_user(data):
    """
    Get the user ID based on the provided username from the users data.

    Parameters:
    - data (dict): A dictionary containing the username for which the user ID needs to be retrieved.

    Returns:
    - str or None: The user ID corresponding to the provided username, or None if the username is not found in the users data.
    """
    users_response = get_users()  # get users is a function from the users api
    users_data = users_response.get_json()
    user_id = None
    
    # Find user ID based on the provided username
    for user in users_data:
        if user['username'] == data['username']:
            user_id = user['id']
            break
    return user_id



def is_username_already_taken(data: dict) -> bool:
    """
    Check if the provided username is already taken by another user.
    """
    users_response = get_users()  # get users is a function from the users api
    users_data = users_response.get_json()
    
    for user in users_data:
        if user['username'] == data['username']:
            return True
    
    return False
