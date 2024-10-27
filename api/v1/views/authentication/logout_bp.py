from venv import logger
from flask import make_response, jsonify, request
from flask_jwt_extended import get_jwt, jwt_required
import redis
from api.v1.views import app_auth

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token_in_redis = jwt_redis_blocklist.get(jti)
    return token_in_redis is not None


@app_auth.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    from api.v1.app import ACCESS_EXPIRES

    jti = get_jwt()["jti"]
    jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)
    return jsonify(msg="Access token revoked")

jwt_redis_blocklist = redis.StrictRedis(
    host="localhost", port=6379, db=0, decode_responses=True
)
