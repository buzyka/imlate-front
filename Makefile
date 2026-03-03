# ============================================================
# Makefile for imlate-front (Vue 3 + Vite) — fully containerized
# ============================================================

# Variables
COMPOSE        = docker compose
FRONTEND_DEV   = frontend-dev
FRONTEND_PROD  = frontend-prod
DIST_DIR       = dist
NODE_IMAGE     = node:20-alpine
BACKEND_URL   ?=

# Reusable Docker run for Node operations (mounts project, preserves node_modules in named volume)
DOCKER_NODE    = docker run --rm \
                   -v $(PWD):/app \
                   -v imlate_node_modules:/app/node_modules \
                   -w /app \
                   -e BACKEND_URL=$(BACKEND_URL) \
                   $(NODE_IMAGE)

.PHONY: help start stop restart logs bash bash-prod bash-run \
        build build-clean build-preview \
        install clean clean-all \
        docker-build docker-build-dev docker-build-prod \
        status

# ============================================================
# Help
# ============================================================

help: ## Show all available commands
	@echo ""
	@echo "  imlate-front — Available commands:"
	@echo "  ──────────────────────────────────────────────"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""

.DEFAULT_GOAL := help

# ============================================================
# Docker Compose — container management
# ============================================================

start: ## Start all services (docker compose up -d)
	$(COMPOSE) up -d

stop: ## Stop all services (docker compose down)
	$(COMPOSE) down

restart: stop start ## Restart all services

start-dev: ## Start only the dev frontend
	$(COMPOSE) up -d $(FRONTEND_DEV)

start-prod: ## Start only the prod frontend (nginx)
	$(COMPOSE) up -d $(FRONTEND_PROD)

logs: ## Follow logs for all services
	$(COMPOSE) logs -f

logs-dev: ## Follow logs for the dev frontend
	$(COMPOSE) logs -f $(FRONTEND_DEV)

logs-prod: ## Follow logs for the prod frontend
	$(COMPOSE) logs -f $(FRONTEND_PROD)

status: ## Show container status
	$(COMPOSE) ps

# ============================================================
# Shell access
# ============================================================

bash: ## Open shell in the running dev container
	$(COMPOSE) exec $(FRONTEND_DEV) sh

bash-prod: ## Open shell in the running prod container
	$(COMPOSE) exec $(FRONTEND_PROD) sh

bash-run: ## Run a disposable Node.js container with shell
	$(DOCKER_NODE) sh

# ============================================================
# Install dependencies (inside Docker)
# ============================================================

install: ## Install npm dependencies (inside Docker)
	$(DOCKER_NODE) sh -c "npm install"

# ============================================================
# Build frontend as static files (inside Docker)
# ============================================================

build: ## Build frontend into static files in dist/ (inside Docker)
	$(DOCKER_NODE) sh -c "npm install && npm run build"
	@echo ""
	@echo "  Done! Frontend built into ./$(DIST_DIR)/"
	@echo ""
	@ls -lah $(DIST_DIR)/

build-preview: build ## Build and launch production preview server (inside Docker)
	$(DOCKER_NODE) sh -c "npx vite preview --host 0.0.0.0"

build-clean: clean-dist build ## Clean dist/ and rebuild

# ============================================================
# Docker — image builds
# ============================================================

docker-build: docker-build-dev docker-build-prod ## Build all Docker images

docker-build-dev: ## Build the dev Docker image
	$(COMPOSE) build $(FRONTEND_DEV)

docker-build-prod: ## Build the prod Docker image (nginx + static files)
	$(COMPOSE) build $(FRONTEND_PROD)

# ============================================================
# Cleanup
# ============================================================

clean-dist: ## Remove dist/
	rm -rf $(DIST_DIR)

clean-modules: ## Remove node_modules volume
	docker volume rm -f imlate_node_modules

clean: clean-dist ## Clean build output (dist/)

clean-all: clean-dist clean-modules ## Clean everything (dist/ + node_modules volume)
