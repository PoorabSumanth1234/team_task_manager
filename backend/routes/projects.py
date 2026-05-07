from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

projects_bp = Blueprint("projects", __name__)

@projects_bp.route("/", methods=["POST"])
@jwt_required()
def create_project():

    data = request.json

    name = data.get("name")
    description = data.get("description")

    if not name:
        return jsonify({"message": "Project name is required"}), 400

    db = current_app.config["db"]

    project = {
        "name": name,
        "description": description,
        "created_by": get_jwt_identity(),
        "created_at": datetime.utcnow()
    }

    result = db.projects.insert_one(project)

    return jsonify({
        "message": "Project created successfully",
        "project_id": str(result.inserted_id)
    }), 201


@projects_bp.route("/", methods=["GET"])
@jwt_required()
def get_projects():

    db = current_app.config["db"]

    projects = list(db.projects.find())

    for project in projects:
        project["_id"] = str(project["_id"])

    return jsonify(projects), 200