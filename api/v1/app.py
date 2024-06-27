#!/usr/bin/python3
"""the Flask app for sprout collab"""
from flask import Flask, make_response, jsonify
from api.v1.views import app_views
from models import storage
from flasgger import Swagger
from flask_cors import CORS


app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


app.register_blueprint(app_views)

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


app.config['SWAGGER'] = {
        'title': 'Sprout Collab Restfull Api',
        'uiversion': 3
    }

Swagger(app)
    


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", threaded=True, debug=True)
