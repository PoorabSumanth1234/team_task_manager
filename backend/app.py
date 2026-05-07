from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os
from routes.auth import auth_bp
from routes.tasks import tasks_bp
from routes.projects import projects_bp


load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "supersecretkey"

jwt = JWTManager(app)
CORS(app)

# JWT CONFIG
app.config["JWT_SECRET_KEY"] = "supersecretkey"

jwt = JWTManager(app)

# MongoDB
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)

db = client["team_task_manager"]

app.config["db"] = db

# ROUTES
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(tasks_bp, url_prefix="/api/tasks")
app.register_blueprint(projects_bp, url_prefix="/api/projects")

@app.route("/")
def home():
    return {
        "message": "Backend running successfully"
    }


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )