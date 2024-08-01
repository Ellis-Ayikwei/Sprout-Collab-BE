import firebase
from firebase_admin import credentials
import firebase_admin

cred = credentials.Certificate("/home/rockefeller/Downloads/sprout-collab-65cc2-firebase-adminsdk-5r6h4-769d3efe8f.json")
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'sprout-collab-65cc2.appspot.com'
})