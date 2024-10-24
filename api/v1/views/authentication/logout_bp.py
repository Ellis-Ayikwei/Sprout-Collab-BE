

from venv import logger
from flask import make_response,jsonify, request
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, set_access_cookies, unset_jwt_cookies
from api.v1.app import jwt_redis_blocklist
from api.v1.views import app_auth

@app_auth.route("/logout", methods=["POST"], strict_slashes=False)
def logout():
    from .login_bp import ACCESS_EXPIRES

    try:
        resp = make_response(jsonify({'message': 'Logged out successfully!'}))
        # Clear cookies for access and refresh tokens
        unset_jwt_cookies(resp)
        logger.info('User logged out')
        return resp, 200
    except Exception as e:
        logger.error(f"Error logging out user: {e}")
        return make_response(jsonify({'message': 'Error logging out user'}), 500)

