# imlate-front

Vue.js administration panel for the ISB project.

## Requirements

- **Node.js** 20+ and **npm** — for local development
- **Docker** — only needed if building via `make build` (uses standard `node:20-alpine` image)
- Access to the backend service (e.g. `https://isb.buzyka.com`)

### Installing Node.js

**macOS** (via Homebrew):

```bash
brew install node@20
```

If `node` is not found after install, add it to PATH:

```bash
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Windows**: Download the LTS installer from https://nodejs.org/

## Quick Start

```bash
# 1. Install dependencies
npm ci

# 2. Start the development server (hot reload)
npm run dev
```

Open http://localhost:5173/admin/ in your browser.

Changes to files in `src/` will trigger automatic reload — no manual rebuild needed.

## Available Commands

### npm

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start dev server with hot reload         |
| `npm run build`   | Build static files for production        |
| `npm run preview` | Preview the production build locally     |

### Makefile (uses Docker — no local Node.js needed)

| Command              | Description                                      |
|----------------------|--------------------------------------------------|
| `make help`          | Show all available commands                       |
| `make dev`           | Start Vite dev server locally (requires Node.js)  |
| `make install`       | Install npm dependencies (inside Docker)          |
| `make build`         | Build static files into `dist/` (inside Docker)   |
| `make build-preview` | Build and preview production build (inside Docker) |
| `make build-clean`   | Clean dist/ and rebuild (inside Docker)           |
| `make bash-run`      | Open a shell in a disposable Node.js container    |
| `make clean`         | Remove `dist/`                                    |
| `make clean-all`     | Remove `dist/` and Docker node_modules volume     |

Pass `BACKEND_URL` for production builds:

```bash
make build BACKEND_URL=https://isb.buzyka.com
```

## Backend Configuration

The dev server proxies API requests (`/login`, `/refresh`, `/admin-api`, `/assets`) to the backend.

### For local development

The file `.env.development` sets the backend URL:

```
BACKEND_URL=https://isb.buzyka.com
```

This is loaded automatically by `npm run dev`. No extra steps needed.

To override locally without committing, create `.env.development.local`:

```
BACKEND_URL=https://your-custom-backend.example.com
```

### For production build

Pass `BACKEND_URL` when building:

```bash
BACKEND_URL=https://isb.buzyka.com npm run build
```

Built files are output to `dist/admin/`.

## Project Structure

```
src/
├── main.js              # App entry point
├── App.vue              # Root component
├── router/index.js      # Vue Router configuration
├── stores/auth.js       # Authentication store (Pinia)
├── services/api.js      # Axios API client
├── composables/         # Reusable composition functions
├── components/          # Shared components
└── views/               # Page components
    ├── Login.vue
    ├── Dashboard.vue
    ├── Users.vue
    ├── AdminUsers.vue
    └── Profile.vue
```
