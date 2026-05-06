from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    get_jwt
)

project_bp = Blueprint("projects", __name__)

# CREATE PROJECT
@project_bp.route("/", methods=["POST"])
@jwt_required()
def create_project():

    # Get JWT claims
    claims = get_jwt()

    # RBAC CHECK
    if claims["role"] != "admin":
        return jsonify({
            "message": "Admins only"
        }), 403

    data = request.json

    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({
            "message": "All fields required"
        }), 400

    project = {
        "title": title,
        "description": description,
        "createdBy": get_jwt_identity()
    }

    current_app.db.projects.insert_one(project)

    return jsonify({
        "message": "Project created successfully"
    }), 201


# GET ALL PROJECTS
@project_bp.route("/", methods=["GET"])
@jwt_required()
def get_projects():

    projects = list(current_app.db.projects.find())

    for project in projects:
        project["_id"] = str(project["_id"])

    return jsonify(projects), 200