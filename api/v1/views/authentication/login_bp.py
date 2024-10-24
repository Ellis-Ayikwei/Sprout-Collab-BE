import logging
from flask import Flask, abort, jsonify, request, make_response

from flask_jwt_extended import create_refresh_token, get_csrf_token, set_access_cookies, set_refresh_cookies
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import datetime
from flask_limiter import Limiter
from api.v1.helpers.helper_functions import get_user_id_from_all_user
from api.v1.views import app_auth
from models import storage
from models.user import User


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app_auth.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """Handle login requests."""
    from api.v1.app import bcrypt, ACCESS_EXPIRES

    data = request.get_json()

    if not data or ('username' not in data and 'email' not in data) or 'password' not in data:
        return jsonify({'message': 'Missing username/email or password'}), 400

    user_id = None

    if 'username' in data:
        user_id = get_user_id_from_all_user(username=data['username'])
    elif 'email' in data:
        user_id = get_user_id_from_all_user(email=data['email'])

    if user_id is None:
        abort(404, description='User not found')

    user = storage.get(User, user_id)

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username, expires_delta=ACCESS_EXPIRES)
        refresh_token = create_refresh_token(identity=user.username)

        response = make_response(jsonify(user.to_dict()))
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        csrf_access_token = get_csrf_token(access_token)
        response.set_cookie('csrf_access_token', value=csrf_access_token, httponly=False, secure=False, path='/', expires=datetime.datetime.now() + ACCESS_EXPIRES)
        
        return response

    return jsonify({'message': 'Invalid credentials'}), 401

# Route to refresh the access token
@app_auth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_access_token():
    """
    Refresh an access token.
    """
    from api.v1.app import bcrypt, ACCESS_EXPIRES

    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id, expires_delta=ACCESS_EXPIRES)
    refresh_token = create_refresh_token(identity=user_id)

    response = make_response(jsonify({"message": "Token refreshed!"}))
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    csrf_access_token = get_csrf_token(access_token)
    response.set_cookie('csrf_access_token', value=csrf_access_token, httponly=False, 
                    secure=False, path='/', 
                    expires=datetime.datetime.now() + ACCESS_EXPIRES)


    return response
