from flask import request, jsonify
from firebase_admin import auth
from flask_jwt_extended import create_access_token, create_refresh_token
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
        user_id = decoded_token['uid']
        users_response = get_users()
        users = users_response.get_json()
        found_user = None
        for user in users:
            if user['id'] == user_id:
                print(user)
                found_user = user
                break

        if found_user is None:
            return jsonify({'error': 'User not found'}), 404

        # Generate JWT for your Flask app (custom JWT for further API access)
        access_token = create_access_token(identity=found_user.username, expires_delta=ACCESS_EXPIRES)
        refresh_token = create_refresh_token(identity=found_user.username)
        return jsonify({'access_token': access_token, 'refresh_token': refresh_token,}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
