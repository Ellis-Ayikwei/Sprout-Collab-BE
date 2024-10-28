import datetime
from typing import Union
from flask import make_response, request, jsonify
from firebase_admin import auth
from flask_jwt_extended import create_access_token, create_refresh_token
from requests import get
from api.v1.helpers.helper_functions import get_user_id_from_all_user
from api.v1.views.user import get_users
from models import storage
from api.v1.views import app_auth


from models.user import User

@app_auth.route('/verify_token', methods=['POST'])
def verify_token():
    """
    Verify Firebase ID token and return a custom JWT for further API access.
    Expects `Authorization` header with a valid Firebase ID token.
    Returns a JSON response with a custom JWT for the user.
    """
    from api.v1.app import ACCESS_EXPIRES
    id_token = request.headers['Authorization'].split('Bearer ')[1]
    
    try:
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token['uid']
        user_email = decoded_token['email']
        print("the decoded token", decoded_token)

        found_user = get_google_uid_or_create(google_uid=user_uid, email=user_email)

        if found_user is None:
            return jsonify({'error': 'User not found'}), 404

        # Generate JWT for your Flask app (custom JWT for further API access)
        access_token = create_access_token(identity=found_user.username, expires_delta=ACCESS_EXPIRES)
        refresh_token = create_refresh_token(identity=found_user.username)
        response = make_response(jsonify(found_user.to_dict()))
        response.headers['Authorization'] = 'Bearer ' + access_token
        response.headers['X-Refresh-Token'] = refresh_token
        print("response headers", response.headers)
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app_auth.route('/signup_with_google', methods=['POST'])
def signup_with_google():
    """
    Verify Firebase ID token and sign up the user with the associated email.
    Expects `Authorization` header with a valid Firebase ID token.
    Returns a JSON response with a custom JWT for the user.
    """
    from api.v1.app import ACCESS_EXPIRES
    from flask import request, jsonify
    from werkzeug.security import generate_password_hash

    id_token = request.headers['Authorization'].split('Bearer ')[1]
    user_details = request.json.get('userDetails')
    
    try:
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token['uid']
        email = decoded_token['email']

        # Check if the user already exists
        user = get_user_id_from_all_user(email=email)
        if not user:
            # Create a new user if not found
            user = User(
                google_0auth_uid=user_uid,
                email=user_details['email'],
                first_name=user_details['first_name'],
                last_name=user_details['last_name'],
                profile_picture=user_details['profile_picture'],
                password=generate_password_hash("google_oauth_user", method='sha256'),  # Placeholder password
                date_joined=datetime.utcnow()
            )
            user.save()
            return make_response(jsonify(user.to_dict())), 200
        return make_response("user already exists"), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 400


def get_google_uid_or_create(google_uid: str, email: str) -> Union[User, None]:
    """
    Retrieve the user associated with the given Google UID, or create a new association.

    Parameters:
    - google_uid (str): The Google UID to be verified or associated with a user.
    - email (str): The email address to find the user.

    Returns:
    - User or None: The user object associated with the provided Google UID or None if not found.
    """
    user_id = get_user_id_from_all_user(email=email)
    user = storage.get(User, user_id)
    if user and user.google_0auth_uid == google_uid:
        return user

    # If no user found with the Google UID, create a new association
    if user:
        user.google_0auth_uid = google_uid
        storage.save()
        return user

    return None
