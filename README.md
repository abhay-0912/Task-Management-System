# Task Management System

Full-stack task management app (Express + MongoDB backend, React frontend) with JWT authentication and role-based task access.

Quick start:

1. Backend

```powershell
cd server
npm install
copy .env.example .env
# edit .env to set MONGO_URI and JWT_SECRET
npm run dev
```

2. Frontend

```powershell
cd client
npm install
set REACT_APP_API=http://localhost:5000
npm start
```

The API exposes routes under `/api/auth` and `/api/tasks`.
