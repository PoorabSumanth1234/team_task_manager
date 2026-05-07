from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.tasks import task_bp
from routes.projects import project_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(task_bp, url_prefix="/api/tasks")
app.register_blueprint(project_bp, url_prefix="/api/projects")

@app.route("/")
def home():
    return {"message": "Backend Running Successfully"}

if __name__ == "__main__":
    app.run(debug=True)