from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from bson import ObjectId
from datetime import datetime

task_bp = Blueprint("tasks", __name__)

# CREATE TASK
@task_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():

    claims = get_jwt()

    # ONLY ADMIN CAN CREATE TASK
    if claims["role"] != "admin":
        return jsonify({
            "message": "Admins only"
        }), 403

    data = request.json

    title = data.get("title")
    assigned_to = data.get("assignedTo")
    project_id = data.get("projectId")
    deadline = data.get("deadline")
    priority = data.get("priority", "Medium")

    # VALIDATIONS
    if not title:
        return jsonify({
            "message": "Task title is required"
        }), 400

    if not assigned_to:
        return jsonify({
            "message": "Assigned user required"
        }), 400

    task = {
        "title": title,
        "status": "todo",
        "priority": priority,
        "assignedTo": assigned_to,
        "projectId": project_id,
        "deadline": deadline,
        "createdBy": get_jwt_identity(),
        "createdAt": datetime.utcnow()
    }

    current_app.db.tasks.insert_one(task)

    return jsonify({
        "message": "Task created successfully"
    }), 201


# GET TASKS
@task_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():

    claims = get_jwt()

    current_user = get_jwt_identity()

    # ADMIN SEES ALL TASKS
    if claims["role"] == "admin":

        tasks = list(current_app.db.tasks.find())

    # MEMBER SEES ONLY THEIR TASKS
    else:

        tasks = list(current_app.db.tasks.find({
            "assignedTo": current_user
        }))

    for task in tasks:

        task["_id"] = str(task["_id"])

    return jsonify(tasks), 200


# UPDATE TASK STATUS
@task_bp.route("/<id>", methods=["PUT"])
@jwt_required()
def update_task(id):

    data = request.json

    new_status = data.get("status")

    valid_statuses = [
        "todo",
        "in-progress",
        "done"
    ]

    if new_status not in valid_statuses:

        return jsonify({
            "message": "Invalid status"
        }), 400

    current_app.db.tasks.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "status": new_status
            }
        }
    )

    return jsonify({
        "message": "Task updated successfully"
    }), 200