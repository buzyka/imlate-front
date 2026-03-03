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

## Настройка URL для изображений (BACKEND_URL)

По умолчанию изображения загружаются по **относительному пути** (без хоста). Это подходит для случаев, когда фронтенд и бэкенд работают на одном домене или через прокси.

Если нужно указать абсолютный адрес бэкенда (например, когда фронтенд и бэкенд на разных доменах), задай переменную окружения `BACKEND_URL`.

### Примеры

**Без хоста (по умолчанию, относительные пути):**

```bash
# docker compose — в .env или docker-compose.yml ничего не указывай
docker compose up --build frontend-prod

# make
make build

# npm
npm run build
```

Изображения будут запрашиваться как `/assets/photo.jpg` (относительный путь).

**С указанием хоста:**

```bash
# docker compose — создай файл .env рядом с docker-compose.yml:
# BACKEND_URL=https://app.isb.orb.local
docker compose up --build frontend-prod

# make
make build BACKEND_URL=https://app.isb.orb.local

# npm
BACKEND_URL=https://app.isb.orb.local npm run build
```

Изображения будут запрашиваться как `https://app.isb.orb.local/assets/photo.jpg` (абсолютный путь).

### Где это работает

Переменная `BACKEND_URL` используется:

* В `vite.config.js` — для проксирования запросов к API в режиме разработки и для передачи значения `VITE_BACKEND_URL` в клиентский код.
* В `Users.vue` — для формирования URL изображений посетителей.
* В `Dockerfile` — как `ARG` при сборке продакшн-образа.
* В `Makefile` — как переменная по умолчанию (пустая).

Нужно добавить БД, миграции или окружения для реального сервера? Скажи, подкину docker-сервис для Postgres/SQLite и пример подключения.
