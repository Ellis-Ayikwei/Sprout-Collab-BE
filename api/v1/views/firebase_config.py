import firebase
from firebase_admin import credentials
import firebase_admin

cred = credentials.Certificate("./sprout-collab-65cc2-firebase-adminsdk-5r6h4-8cce56a4a7.json")
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'sprout-collab-65cc2.appspot.com'
})