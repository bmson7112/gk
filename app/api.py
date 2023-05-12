from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://mongodb:27017/')
db = client.test_database

@app.route('/')
def VDT():
    return "Bui Minh Son - VDT" 

@app.route('/users')
def users():
    collection = db.users.find()

    data = []
    for element in collection:
        item = {
            'id': str(element['_id']),
            'STT': element['STT'],
            'Name': element['Name'],
            'YearOfBirth': element['YearOfBirth'],
            'Sex': element['Sex'],
            'School': element['School'],
            'Major': element['Major']
        }
        data.append(item)

    return jsonify(data)

@app.route('/user', methods=['POST'])
def save_user():
    Name = request.json['Name']
    YearOfBirth = request.json['YearOfBirth']
    School = request.json['School']
    user = {
        'Name': Name,
        'YearOfBirth': YearOfBirth,
        'School': School
    }
    db.users.insert_one(user)

    return jsonify({'status': 'success'})

@app.route('/delete/<user_id>', methods=['POST'])
def user():
    if request.method == 'POST':
        action = request.form['action']
        user_id = request.form['user_id']

        if action == 'delete':
            db.users.delete_one({'_id': ObjectId(user_id)})
            return jsonify({'status': 'success'})