from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS
CORS(app)

# JWT Config
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)

# MongoDB Connection
mongo_uri = os.getenv("MONGO_URI")

print("Mongo URI:", mongo_uri)

client = MongoClient(mongo_uri)

db = client["taskmanager"]

app.db = db

# Import Routes
from routes.auth import auth_bp
from routes.projects import project_bp
from routes.tasks import task_bp

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(project_bp, url_prefix="/api/projects")
app.register_blueprint(task_bp, url_prefix="/api/tasks")

# Home Route
@app.route("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }

# Run Server
if __name__ == "__main__":
    app.run(debug=True)