# #!/usr/bin/python3
# """the Flask app for sprout collab"""
# from flask import Flask, make_response, jsonify
# from api.v1.views import app_views
# from api.v1.views import app_auth

# from models import storage
# from flasgger import Swagger
# from flask_cors import CORS


# app = Flask(__name__)
# app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
# cors = CORS(app)
# # cors = CORS(app, resources={r"sc/api/v1/*": {"origins": "*"}})

# app.register_blueprint(app_views)
# app.register_blueprint(app_auth)
# @app.teardown_appcontext
# def close_db(error):
#     """ Close Storage """
#     storage.close()


# @app.errorhandler(404)
# def not_found(error):
#     """ 404 Error
#     ---
#     responses:
#       404:
#         description: a resource was not found
#     """
#     return make_response(jsonify({'error': "Not found"}), 404)


# app.config['SWAGGER'] = {
#         'title': 'Sprout Collab Restfull Api',
#         'uiversion': 3
#     }

# Swagger(app)
    


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port="5004", threaded=True, debug=True)


#!/usr/bin/env python3
"""The Flask app for Sprout Collab"""

import datetime
import os
import sys
from flask import Flask, make_response, jsonify, request
from flask_mail import Mail
import redis


from .views import app_views, app_auth
from models import storage
from flasgger import Swagger
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# Initialize Bcrypt and CSRF globally
bcrypt = Bcrypt()
mail = Mail()
jwt_redis_blocklist = redis.StrictRedis(
    host="localhost", port=6379, db=0, decode_responses=True
)

ACCESS_EXPIRES = datetime.timedelta(hours=1)

def create_app():
    app = Flask(__name__)
    jwt =JWTManager(app)
    mail.init_app(app)
    
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['FLASK_MAIL_DEBUG'] = True
    
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

    
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
        jti = jwt_payload["jti"]
        token_in_redis = jwt_redis_blocklist.get(jti)
        return token_in_redis is not None
    
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret')
    app.config['JWT_HEADER_NAME']  = "Authorization"
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = ACCESS_EXPIRES
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    # app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    allowed_origins = ["http://localhost:3000", "https://www.sproutcollab.me/"]


    app.config["CORS_HEADERS"] = ["Content-Type", "Authorization", "X-Refresh-Token"]
    # Change this in your code!
    app.config["JWT_SECRET_KEY"] = "super-secret"


    # Initialize extensions
    bcrypt.init_app(app)
    CORS(app,
        resources={r"sc/api/v1/*": {"origins": "*"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization", "X-Refresh-Token"]
        )
    
    print(app.url_map)
    

    # Register blueprints
    app.register_blueprint(app_views)
    app.register_blueprint(app_auth)


    @app.before_request
    def handle_preflight():
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Refresh-Token"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            return response, 204

    @app.after_request
    def after_request(response):
        origin = request.headers.get("Origin")
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Refresh-Token"
        response.headers["Access-Control-Expose-Headers"] = "Authorization, X-Refresh-Token"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        return response
        
    
    # Configure Swagger
    app.config['SWAGGER'] = {
        'title': 'Sprout Collab Restful API',
        'uiversion': 3
    }
    Swagger(app)

    @app.teardown_appcontext
    def close_db(error):
        """Close Storage"""
        storage.close()

   

    @app.errorhandler(404)
    def not_found(error):
        """404 Error
        ---
        responses:
          404:
            description: a resource was not found
        """
        return make_response(jsonify({'error': "Not found"}), 404)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5004, threaded=True, debug=True)

