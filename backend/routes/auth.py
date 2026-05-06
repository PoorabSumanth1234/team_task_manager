from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
import bcrypt

auth_bp = Blueprint("auth", __name__)

# SIGNUP
@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "member")

    # Validation
    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    users = current_app.db.users

    # Check existing user
    existing_user = users.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Insert user
    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role
    })

    return jsonify({
        "message": "Signup successful"
    }), 201


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    users = current_app.db.users

    user = users.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    # Check password
    password_correct = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    )

    if not password_correct:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    # Create JWT token
    token = create_access_token(
    identity=user["email"],
    additional_claims={
        "role": user["role"]
    }
)

    return jsonify({
        "token": token,
        "role": user["role"],
        "name": user["name"]
    }), 200