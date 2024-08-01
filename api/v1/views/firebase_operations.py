from api.v1.views import app_views
from flask import request, jsonify
import api.v1.views.firebase_config as firebase_config
from firebase_admin import storage

@app_views.route('/upload', methods=['POST'], strict_slashes=False)
def upload_to_firbase():    
    try:
        file = request.files['file']
        file_name = file.filename
        content_type = file.content_type
        
        # Upload the file to Firebase Storage
        bucket = storage.bucket()
        blob = bucket.blob(f"resources/{file_name}")
        blob.upload_from_file(file, content_type=content_type)
        blob.make_public()
        
        file_url = blob.public_url
        return jsonify({"fileURL" : file_url}), 200
    except Exception as e:
        print(f"Error uploading file: {e}")
        return jsonify({"error": "Error uploading file"}), 500
    
@app_views.route('/delete_from_firebase', methods=['POST'], strict_slashes=False)
def delete_from_firebase():
    try:
        data = request.get_json()
        file_path = data['url']

        bucket = storage.bucket()
        blob = bucket.blob(file_path)
        blob.delete()

        return jsonify({"status": "success", "message": "File deleted from Firebase successfully"}), 200
    except Exception as e:
        return jsonify({"status": "failure", "message": str(e)}), 500