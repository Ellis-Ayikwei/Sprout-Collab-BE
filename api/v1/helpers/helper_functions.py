from api.v1.views.user import get_users

def get_user_id_from_all_user(username=None, email=None):
    """
    Get the user ID based on the provided username or email from the users data.

    Parameters:
    - username (str, optional): The username for which the user ID needs to be retrieved.
    - email (str, optional): The email for which the user ID needs to be retrieved.

    Returns:
    - str or None: The user ID corresponding to the provided username or email, or None if not found.
    """
    users_response = get_users()
    if users_response.status_code != 200:
        print("Failed to retrieve users data")
        return None  # Early exit if user data retrieval failed
    
    users_data = users_response.get_json()
    user_id = None
    
    # Find user ID based on the provided username or email
    for user in users_data:
        if (username and user['username'] == username) or (email and user['email'] == email):
            user_id = user['id']
            print(f"Found user ID: {user_id}")
            break
            
    return user_id




def is_username_already_taken(username=None) -> bool:
    """
    Check if the provided username is already taken by another user.
    """
    users_response = get_users()
    users_data = users_response.get_json()
    
    for user in users_data:
        if user['username'].casefold() == username.casefold():
            return True
    
    return False


def is_email_already_registered(email=None) -> bool:
    """
    Check if the provided email is already taken by another user.
    """
    users_response = get_users()
    users_data = users_response.get_json()
    
    for user in users_data:
        if user['email'] == email:
            return True
    
    return False