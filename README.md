# imlate-front

Vue.js administration panel for the ISB project.

## Requirements

- **Node.js** 22+ and **npm** — for local development (the version is pinned in `.nvmrc`)
- **Docker** — only needed if building via `make build` (uses standard `node:22-alpine` image)
- Access to the backend service (e.g. `https://isb.buzyka.com`)

### Installing Node.js

**macOS** (via Homebrew):

```bash
brew install node@22
```

If `node` is not found after install, add it to PATH:

```bash
echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc
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

| Command                 | Description                                                  |
|-------------------------|--------------------------------------------------------------|
| `npm run dev`           | Start dev server with hot reload                             |
| `npm run build`         | Build static files for production                            |
| `npm run preview`       | Preview the production build locally                         |
| `npm test`              | Run unit and component tests (Vitest)                        |
| `npm run test:watch`    | Run tests in watch mode                                      |
| `npm run test:coverage` | Run tests with a coverage report in `coverage/`              |
| `npm run lint`          | ESLint (JS and Vue) and Stylelint (CSS)                      |
| `npm run lint:fix`      | Fix what the linters can fix automatically                   |
| `npm run format`        | Format files with Prettier                                   |
| `npm run deps:check`    | Find unused files, exports and missing or unused dependencies |
| `npm run check`         | Everything CI checks, in one command                         |

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

The dev server proxies API requests (`/login`, `/refresh`, `/logout`, `/admin-api`, `/assets`) to the backend.

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

## CI Checks

Every pull request to `main` runs these checks (`.github/workflows/`). Run `npm run check` before pushing to catch the same problems locally.

| Check | What fails it |
|-------|---------------|
| `lint` | ESLint or Stylelint errors, files not formatted with Prettier |
| `deps` | Unused files or exports, unused or missing dependencies (`knip`) |
| `test` | A failing test |
| `coverage-gate` | **Line coverage drops by more than 0.1 percentage points** compared with the base branch |
| `build` | `vite build` fails. The bundle size and its change are shown in the job summary (report only, never fails) |
| `audit` | A high or critical vulnerability in a production dependency |
| `dependency-review` | The PR adds a dependency with a high/critical vulnerability or a GPL/AGPL licence |
| `CodeQL` | Static security analysis finds a problem |

Tests live next to the code as `*.test.js`. Component tests mount `.vue` files with `@vue/test-utils` and start with `// @vitest-environment happy-dom` (see `src/components/FireAlarmControl.test.js`). New code needs tests, or coverage drops and the PR fails.

Dependabot opens weekly PRs for npm packages and GitHub Actions. A release (`release.yml`) runs lint and tests before it builds.

## Design System

The design system lives in `Design System/`. Its click-through UI kit loads `.jsx` files and does not work when opened from disk (`file://`). Serve the folder instead:

```bash
cd "Design System" && python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/ui_kits/admin/index.html (login `admin`, any password). The redesign backlog is in `issues/`.

## Project Structure

```
src/
├── main.js              # App entry point
├── App.vue              # Root component
├── router/index.js      # Vue Router configuration
├── stores/auth.js       # Authentication store (Pinia)
├── services/api.js      # Axios API client
├── components/          # Shared components
└── views/               # Page components
    ├── Login.vue
    ├── Dashboard.vue
    ├── Users.vue
    ├── AdminUsers.vue
    └── Profile.vue
```
