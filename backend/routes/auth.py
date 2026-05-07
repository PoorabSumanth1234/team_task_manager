from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth", __name__)


# SIGNUP
@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "member")

    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    db = current_app.config["db"]
    users = db.users

    existing_user = users.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    hashed_password = generate_password_hash(password)

    new_user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role
    }

    users.insert_one(new_user)

    return jsonify({
        "message": "User created successfully"
    }), 201


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    db = current_app.config["db"]
    users = db.users

    user = users.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    if not check_password_hash(user["password"], password):
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    token = create_access_token(identity=str(user["_id"]))

    return jsonify({
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "member")
        }
    }), 200