# Team Task Manager 🚀

A full-stack Team Task Manager web application built using React, Flask, and MongoDB.  
The application allows teams to manage projects, assign tasks, track progress, and monitor overdue tasks with role-based access control.

---

## 🌐 Live Demo

### Frontend
(https://team-task-manager-mrjj2vzok-poorabsumanth1234s-projects.vercel.app/)

### Backend API
http://teamtaskmanager-production-f9da.up.railway.app

---

## ✨ Features

### 🔐 Authentication
- User Signup
- User Login
- JWT Authentication
- Secure Password Hashing

### 👥 Role-Based Access Control
- Admin and Member roles
- Admin-only task/project creation
- Protected routes using JWT

### 📁 Project Management
- Create Projects
- View Projects

### ✅ Task Management
- Create Tasks
- Assign Tasks to Team Members
- Update Task Status
- Task Priority (Low / Medium / High)
- Kanban-style Dashboard

### 📊 Dashboard
- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Task Detection
- Search Tasks

### 🎨 UI Features
- Responsive Design
- Modern Dashboard UI
- Status Color Indicators
- Priority Badges

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Flask
- Flask JWT Extended
- Flask CORS
- PyMongo

### Database
- MongoDB Atlas

### Deployment
- Railway (Backend)
- Vercel (Frontend)

---

## 📂 Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── projects.py
│   │   └── tasks.py
│   │
│   ├── app.py
│   ├── requirements.txt
│   ├── Procfile
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Navigate to backend

```bash
cd backend
```

## 2️⃣ Create virtual environment

```bash
python -m venv venv
```

## 3️⃣ Activate virtual environment

### Windows
```bash
venv\Scripts\activate
```

### Mac/Linux
```bash
source venv/bin/activate
```

## 4️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

## 6️⃣ Run backend

```bash
python app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

# ⚛️ Frontend Setup

## 1️⃣ Navigate to frontend

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔑 API Endpoints

## Authentication

### Signup
```http
POST /api/auth/signup
```

### Login
```http
POST /api/auth/login
```

---

## Projects

### Create Project
```http
POST /api/projects/
```

### Get Projects
```http
GET /api/projects/
```

---

## Tasks

### Create Task
```http
POST /api/tasks/
```

### Get Tasks
```http
GET /api/tasks/
```

### Update Task Status
```http
PUT /api/tasks/:id
```

---

# 🔒 Role-Based Access

| Role | Permissions |
|------|-------------|
| Admin | Create projects & tasks |
| Member | View assigned tasks |

---

# 🚀 Deployment

## Backend Deployment
- Railway

## Frontend Deployment
- Vercel

---



---

# 👨‍💻 Author
Poorab
---

# 📄 License

This project is built for assignment and learning purposes.