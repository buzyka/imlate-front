# ============================================================
# Makefile for imlate-front (Vue 3 + Vite)
# ============================================================

# Variables
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

.PHONY: help dev install build build-preview build-clean \
        bash-run clean-dist clean-modules clean clean-all

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
# Local development (requires Node.js installed)
# ============================================================

dev: ## Start Vite dev server locally with hot reload
	npm run dev

# ============================================================
# Shell access (via Docker)
# ============================================================

bash-run: ## Run a disposable Node.js container with shell
	$(DOCKER_NODE) sh

# ============================================================
# Install dependencies (via Docker)
# ============================================================

install: ## Install npm dependencies (inside Docker)
	$(DOCKER_NODE) sh -c "npm install"

# ============================================================
# Build frontend as static files (via Docker)
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
# Cleanup
# ============================================================

clean-dist: ## Remove dist/
	rm -rf $(DIST_DIR)

clean-modules: ## Remove node_modules Docker volume
	docker volume rm -f imlate_node_modules

clean: clean-dist ## Clean build output (dist/)

clean-all: clean-dist clean-modules ## Clean everything (dist/ + node_modules volume)
