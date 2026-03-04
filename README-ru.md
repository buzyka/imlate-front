# imlate-front

Панель администрирования на Vue.js для проекта ISB.

## Требования

- **Node.js** версии 20 или выше и **npm** — для локальной разработки
- **Docker** — нужен только для сборки через `make build` (использует стандартный образ `node:20-alpine`)
- Доступ к бэкенд-сервису (например, `https://isb.buzyka.com`)

### Установка Node.js

**macOS** (через Homebrew):

```bash
brew install node@20
```

Если после установки `node` не найден, добавьте его в PATH:

```bash
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Windows**:

1. Скачайте установщик с https://nodejs.org/ (версия LTS).
2. Запустите установщик, следуйте инструкциям (все настройки по умолчанию подходят).
3. После установки откройте **новый** терминал и проверьте:

```bash
node --version
npm --version
```

### Настройка VS Code (Windows и macOS)

1. Установите [VS Code](https://code.visualstudio.com/).
2. Откройте папку проекта: **File → Open Folder** → выберите папку `isb-front`.
3. Откройте встроенный терминал: **Terminal → New Terminal** (или `Ctrl+`` `).
4. В терминале выполните команды из раздела «Быстрый старт» ниже.

> **Совет:** установите расширение [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) для подсветки и автодополнения Vue-файлов.

## Быстрый старт

```bash
# 1. Установить зависимости (выполняется один раз или после обновления package.json)
npm ci

# 2. Запустить сервер разработки с автоперезагрузкой (hot reload)
npm run dev
```

Откройте в браузере: http://localhost:5173/admin/

При изменении файлов в `src/` страница обновится автоматически — пересборка вручную не нужна.

## Доступные команды

### npm

| Команда             | Описание                                           |
|---------------------|----------------------------------------------------|
| `npm run dev`       | Запуск сервера разработки с hot reload              |
| `npm run build`     | Сборка статических файлов для продакшена            |
| `npm run preview`   | Предварительный просмотр продакшен-сборки           |

### Makefile (использует Docker — локальный Node.js не нужен)

| Команда                | Описание                                               |
|------------------------|--------------------------------------------------------|
| `make help`            | Показать все доступные команды                          |
| `make dev`             | Запуск Vite dev server локально (требуется Node.js)     |
| `make install`         | Установить npm-зависимости (внутри Docker)              |
| `make build`           | Собрать статику в `dist/` (внутри Docker)               |
| `make build-preview`   | Собрать и запустить превью продакшен-сборки (Docker)    |
| `make build-clean`     | Очистить dist/ и пересобрать (Docker)                   |
| `make bash-run`        | Открыть shell в одноразовом Node.js контейнере          |
| `make clean`           | Удалить `dist/`                                         |
| `make clean-all`       | Удалить `dist/` и Docker-том с node_modules             |

Передайте `BACKEND_URL` для продакшен-сборки:

```bash
make build BACKEND_URL=https://isb.buzyka.com
```

## Настройка бэкенда

Сервер разработки проксирует API-запросы (`/login`, `/refresh`, `/admin-api`, `/assets`) на бэкенд-сервис.

URL бэкенда задаётся через переменную окружения `BACKEND_URL`.

### Для локальной разработки

Файл `.env.development` уже содержит URL бэкенда:

```
BACKEND_URL=https://isb.buzyka.com
```

Этот файл загружается Vite **только** в режиме разработки (`npm run dev`). Дополнительных действий не требуется.

Чтобы переопределить URL локально (без коммита в git), создайте файл `.env.development.local`:

```
BACKEND_URL=https://your-custom-backend.example.com
```

### Для продакшен-сборки

Передайте `BACKEND_URL` при сборке:

```bash
# macOS / Linux
BACKEND_URL=https://isb.buzyka.com npm run build

# или через Makefile (использует Docker, Node.js не нужен)
make build BACKEND_URL=https://isb.buzyka.com
```

**Windows** (PowerShell):

```powershell
$env:BACKEND_URL="https://isb.buzyka.com"; npm run build
```

**Windows** (cmd):

```cmd
set BACKEND_URL=https://isb.buzyka.com && npm run build
```

Собранные файлы будут в папке `dist/admin/`.

## Переменная BACKEND_URL

Используется в двух местах:

- **`vite.config.js`** — для проксирования запросов к API в режиме разработки и для передачи `VITE_BACKEND_URL` в клиентский код.
- **`src/views/Users.vue`** — для формирования URL изображений посетителей.

Если `BACKEND_URL` не задан, используются относительные пути (подходит, когда фронтенд и бэкенд работают на одном домене через прокси).

## Структура проекта

```
src/
├── main.js              # Точка входа приложения
├── App.vue              # Корневой компонент
├── router/index.js      # Настройка маршрутов (Vue Router)
├── stores/auth.js       # Хранилище авторизации (Pinia)
├── services/api.js      # HTTP-клиент (Axios)
├── composables/         # Переиспользуемые composables
├── components/          # Общие компоненты
└── views/               # Страницы
    ├── Login.vue        # Авторизация
    ├── Dashboard.vue    # Главная панель
    ├── Users.vue        # Управление посетителями
    ├── AdminUsers.vue   # Управление администраторами
    └── Profile.vue      # Профиль пользователя
```

## Решение проблем

### `npm: command not found`

Node.js не установлен или не добавлен в PATH. См. раздел «Установка Node.js» выше.

### Ошибка `ENOTFOUND` при запросах к API

Бэкенд недоступен по указанному адресу. Проверьте:

```bash
curl https://isb.buzyka.com
```

Если команда не возвращает ответ — проблема с сетью или DNS.

### Порт 5173 уже занят

Vite автоматически попробует следующий свободный порт (5174, 5175...). Адрес будет показан в терминале. Чтобы освободить порт:

```bash
# macOS / Linux
lsof -i :5173
kill <PID>
```

```powershell
# Windows (PowerShell)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```
