import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask
app = Flask(__name__)

cred = credentials.Certificate("db_account.json")
firebase_admin.initialize_app(cred)

database = firestore.client()
touche_collection = database.collection('touche_data')
doc = touche_collection.document("lJkUHbTaA7x5zyxnQCap")
data = doc.get().to_dict()

@app.route('/')
def test():
    return "Test"


if __name__ == '__main__':
    app.run()


