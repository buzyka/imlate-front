import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const BACKEND_URL = env.BACKEND_URL || process.env.BACKEND_URL || ''

  return {
    base: '/admin/',
    build: {
      outDir: 'dist/admin',
    },
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(BACKEND_URL),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(env.VITE_APP_VERSION || process.env.VITE_APP_VERSION || '2.0.x-dev'),
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
  }
})
