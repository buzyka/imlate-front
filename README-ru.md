без проблем — сделал Docker и docker-compose для твоей админки. Внутри есть два режима фронта (dev с hot reload и prod на Nginx) и минимальный Go-бэкенд, чтобы всё сразу работало без npm на твоей машине.


## Что внутри

* `Dockerfile.dev` — dev-сборка, запускает Vite-сервер (порт 5173), hot reload.
* `Dockerfile` — prod-сборка: билдит фронт и отдаёт через **nginx** (порт 8081).
* `docker-compose.yml` — поднимает:

  * `backend` (Go, порт 8080) — простые эндпоинты `/api/login`, `/api/users`, CRUD.
  * `frontend-dev` — Vite dev server с прокси на backend.
  * `frontend-prod` — статический билд через nginx.
* `backend/` — минимальный Go-сервер (никакой БД; хранит в памяти).
* `vite.config.js` — читает `BACKEND_URL` из env (по умолчанию `http://localhost:8080`). В докере уже выставлено `http://backend:8080`.

## Быстрый старт (без npm)

### 1) Dev (hot reload)

```bash
docker compose up --build frontend-dev
```

Открой: [http://localhost:5173](http://localhost:5173)
API доступен как `/api` и проксируется в контейнер `backend:8080`.

### 2) Prod (nginx, собранный фронт)

```bash
docker compose up --build frontend-prod
```

Открой: [http://localhost:8081](http://localhost:8081)

### 3) Только бэкенд (если нужно отдельно)

```bash
docker compose up --build backend
```

Слушает [http://localhost:8080](http://localhost:8080)

## Эндпоинты бэкенда

* `POST /api/login` → `{"token":"demo-token"}`
* `GET /api/users` → список пользователей
* `POST /api/users` → создать
* `PUT /api/users/:id` → обновить
* `DELETE /api/users/:id` → удалить

## Настройка под свой бэкенд

Если у тебя свой API не на Go:

* Поменяй `BACKEND_URL` в `docker-compose.yml` (например, на `http://host.docker.internal:8080` или URL твоего сервиса).
* В dev/compose фронт проксирует `/api` туда автоматически (см. `vite.config.js`).

Нужно добавить БД, миграции или окружения для реального сервера? Скажи, подкину docker-сервис для Postgres/SQLite и пример подключения.
