import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const BACKEND_URL = process.env.BACKEND_URL || 'https://app.isb.orb.local'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api/login': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => '/login'
      },
      '/api/refresh': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => '/refresh'
      },
      '/assets': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      },
      '/admin-api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
