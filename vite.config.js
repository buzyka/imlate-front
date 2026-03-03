import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const BACKEND_URL = process.env.BACKEND_URL || ''

export default defineConfig({
  base: '/admin/',
  build: {
    outDir: 'dist/admin',
  },
  define: {
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(BACKEND_URL),
  },
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/login': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      },
      '/refresh': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
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
