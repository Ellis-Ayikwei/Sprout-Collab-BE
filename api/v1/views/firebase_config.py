import firebase
from firebase_admin import credentials
import firebase_admin

cred = credentials.Certificate("/home/ellis_1/SC_WEB_APP/sc_cred_firebase.json")
# cred = credentials.Certificate('C:/Users/Ellis Rockefeller/Downloads/sprout-collab-65cc2-firebase-adminsdk-5r6h4-793065245b.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'sprout-collab-65cc2.appspot.com'
})
