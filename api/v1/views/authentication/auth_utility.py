from venv import logger
from flask import jsonify, request, make_response, abort, session, url_for, current_app
import jwt
import datetime
from functools import wraps
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

from api.v1.views import app_auth
from models import storage

from models.user import User





# Utility function to generate tokens
def generate_tokens(username):
    access_token = jwt.encode({
        'user': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    refresh_token = jwt.encode({
        'user': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    return access_token, refresh_token

# Token decorator to protect routes
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('access_token')
        if not token:
            logger.info('Access token missing')
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            logger.warning('Access token expired')
            return jsonify({'message': 'Token expired, refresh required'}), 401
        except jwt.InvalidTokenError:
            logger.warning('Invalid access token')
            return jsonify({'message': 'Invalid token!'}), 401
        return f(*args, **kwargs)
    return decorated
