from flask import Blueprint, abort, flash, jsonify, redirect, request, url_for
from api.v1.views.authentication.user_validation import validate_user_data
from models.user import User
from api.v1.views import app_auth
from api.v1.helpers.helper_functions import is_email_already_registered, is_username_already_taken

@app_auth.route("/register", methods=["POST"], strict_slashes=False)
def register():
    """Register a new user"""
    form_data = request.get_json()
    print(form_data, flush=True)
    if not form_data:
        abort(400, description="Not a JSON")

    try:
        validated_data = validate_user_data(form_data)
    except ValueError as e:
        abort(400, description=str(e))

    if is_username_already_taken(validated_data['username']):
        abort(400, description="Sorry, username already taken. Please choose another one.")

    if is_email_already_registered(validated_data['email']):
        abort(400, description="Sorry, email already registered. Please log in.")
        
    new_user = User(**validated_data)
    new_user.save()

    flash("You have registered successfully. Please log in.", "success")
    return jsonify(new_user.to_dict()), 201
