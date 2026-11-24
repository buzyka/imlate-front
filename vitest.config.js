import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

// vite.config.js exports a function of the mode, so resolve it first to reuse
// the Vue plugin and the `define` constants in tests.
export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      include: ['src/**/*.test.js'],
      // logic tests run in Node; component tests opt in with `// @vitest-environment happy-dom`
      environment: 'node',
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,vue}'],
        exclude: ['src/**/*.test.js', 'src/main.js'],
        reporter: ['text', 'json-summary', 'lcov'],
        reportsDirectory: 'coverage',
      },
    },
  }),
)
