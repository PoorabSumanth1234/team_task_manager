from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():

    data = request.json

    title = data.get("title")
    description = data.get("description")
    status = data.get("status", "Pending")

    if not title:
        return jsonify({"message": "Title is required"}), 400

    db = current_app.config["db"]

    task = {
        "title": title,
        "description": description,
        "status": status,
        "created_at": datetime.utcnow(),
        "user_id": get_jwt_identity()
    }

    result = db.tasks.insert_one(task)

    return jsonify({
        "message": "Task created successfully",
        "task_id": str(result.inserted_id)
    }), 201


@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():

    db = current_app.config["db"]

    tasks = list(db.tasks.find({
        "user_id": get_jwt_identity()
    }))

    for task in tasks:
        task["_id"] = str(task["_id"])

    return jsonify(tasks), 200