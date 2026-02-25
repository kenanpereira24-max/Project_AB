from flask import Flask, request, redirect
from pymongo import MongoClient

app = Flask(__name__)

uri = "mongodb+srv://User:<db_password>@cluster0.nkifvrg.mongodb.net/?appName=Cluster0"

client = MongoClient(uri)
db = client['sneha_jyothi']
donate_collection = db['donate']
contact_collection = db['contact']

@app.route('/submit_donation', methods=['POST'])
def submit_donation():
    donation_data = {
        "name": request.form.get('name'),
        "book_title": request.form.get('book_title'),
        "quantity": request.form.get('quantity'),
        "address": request.form.get('address')
    }
    donate_collection.insert_one(donation_data)
    return redirect("http://127.0.0.1:5500/index.html")

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    contact_data = {
        "name": request.form.get('name'),
        "email": request.form.get('email'),
        "message": request.form.get('message')
    }
    contact_collection.insert_one(contact_data)
    return redirect("http://127.0.0.1:5500/index.html")

app.run(debug=True, port=5000)