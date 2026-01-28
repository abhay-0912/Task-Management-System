# Task Management Server

Backend Express server with JWT authentication and MongoDB (Mongoose).

Setup:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. npm install
3. npm run dev

APIs:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- CRUD at /api/tasks (protected)
