# Dockerized Vue Admin Starter

## Fast start (dev with hot reload)
```bash
docker compose up --build frontend-dev
```
App: http://localhost:5173 (Vite).  
API proxy: /api -> http://backend:8080 (Go demo backend).

## Start backend (Go)
```bash
docker compose up --build backend
```
(This starts automatically when you run `frontend-dev` or `frontend-prod` because of depends_on.)  
Backend listens on http://localhost:8080 and implements:
- POST /api/login -> { "token": "demo-token" }
- GET /api/users
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

## Production build (Nginx)
```bash
docker compose up --build frontend-prod
```
Static app served at http://localhost:8081

## Notes
- Edit `BACKEND_URL` in `docker-compose.yml` if your backend runs elsewhere.
- In dev mode we mount the project as a volume for live reload.
- SPA routing is pre-configured in the Nginx image.