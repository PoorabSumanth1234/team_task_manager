from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId

tasks_bp = Blueprint("tasks", __name__)

# GET ALL TASKS

@tasks_bp.route("/", methods=["GET"])
def get_tasks():

    db = current_app.config["db"]

    tasks = list(db.tasks.find())

    for task in tasks:

        task["_id"] = str(task["_id"])

    return jsonify(tasks), 200


# CREATE TASK

@tasks_bp.route("/", methods=["POST"])
def create_task():

    db = current_app.config["db"]

    data = request.get_json()

    new_task = {

        "title": data.get("title"),

        "assignedTo": data.get("assignedTo"),

        "projectId": data.get("projectId"),

        "deadline": data.get("deadline"),

        "priority": data.get("priority"),

        "status": data.get("status")
    }

    result = db.tasks.insert_one(new_task)

    return jsonify({

        "message": "Task created successfully",

        "task_id": str(result.inserted_id)

    }), 201


# UPDATE TASK STATUS

@tasks_bp.route("/<task_id>", methods=["PUT"])
def update_task(task_id):

    db = current_app.config["db"]

    data = request.get_json()

    db.tasks.update_one(

        {"_id": ObjectId(task_id)},

        {
            "$set": {

                "status": data.get("status")
            }
        }
    )

    return jsonify({

        "message": "Task updated successfully"

    }), 200