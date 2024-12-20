from venv import logger
from flask import make_response, jsonify, request
from flask_jwt_extended import get_jwt, jwt_required
import redis
from api.v1.views import app_auth


@app_auth.route("/logout", methods=["POST"], strict_slashes=False)
@jwt_required()
def logout():
    from api.v1.app import ACCESS_EXPIRES, jwt_redis_blocklist
    print(get_jwt())
    jti = get_jwt()["jti"]
    jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)
    return jsonify(msg="Access token revoked"), 202

