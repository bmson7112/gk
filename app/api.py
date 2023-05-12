from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

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
            'ho_ten': element['ho_ten'],
            'nam_sinh': element['nam_sinh'],
            'truong': element['truong']
        }
        data.append(item)

    return jsonify(data)

@app.route('/user', methods=['POST'])
def save_user():
    ho_ten = request.json['ho_ten']
    nam_sinh = request.json['nam_sinh']
    truong = request.json['truong']
    user = {
        'ho_ten': ho_ten,
        'nam_sinh': nam_sinh,
        'truong': truong
    }
    db.users.insert_one(user)

    return jsonify({'status': 'success'})
