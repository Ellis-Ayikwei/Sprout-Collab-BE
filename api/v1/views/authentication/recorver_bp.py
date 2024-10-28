from email.policy import strict
from flask import make_response, request, jsonify, url_for
import redis
from api.v1.helpers.helper_functions import get_user_id_from_all_user
from api.v1.views.user import get_user
from api.v1.views import app_auth
from models import storage
from models.user import User
from flask_mail import Mail, Message

user_redis_tokens = redis.StrictRedis(
    host="localhost", port=6379, db=0, decode_responses=True
)

@app_auth.route('/recover', methods=['POST'])
def recover_password():
    """ recover password """
    from api.v1.app import mail
    data = request.get_json()
    if not data:
        return make_response(jsonify({"error": "Invalid request"}), 400)
    email = data.get('email')
    if not email:
        return make_response(jsonify({"error": "Email is required"}), 400)
    user_id = get_user_id_from_all_user(email=email)
    user = get_user(user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    reset_token = user.generate_reset_token()
    msg = Message('Password Reset on Sprout Collab',
                  sender='no-reply@sproutcollab.com',
                  recipients=[email])
    msg.body = f'''To reset your password, visit the following link:
                {url_for('reset_password', token=reset_token, email=email, _external=True)}
                If you did not make this request then simply ignore this email and no changes will be made.
                '''
    mail.send(msg)
    return jsonify({"message": "Success"}), 200


@app_auth.route('/reset_password/<token>', methods=['POST'], strict_slashes=False)
def reset_password(token):
    """ reset password """
    data = request.get_json()
    if not data:
        return make_response(jsonify({"error": "Invalid request"}), 400)
    email = data.get('email')
    if not email:
        return make_response(jsonify({"error": "Email is required"}), 400)
    user_id = get_user_id_from_all_user(email=email)
    user = get_user(user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    
    
    token = user_redis_tokens.get(email, token)
    if not token:
        return make_response(jsonify({"error": "Invalid token"}), 400)
    user.password = data.get('password')
    user.save()
    return make_response(jsonify({"message": "Success"}), 200)
