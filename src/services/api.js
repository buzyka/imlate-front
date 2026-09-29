import axios from 'axios'
import { ElMessage } from 'element-plus'
import { buildLoginRedirect, createAuthSession } from '../features/auth-session.js'

const api = axios.create({
  baseURL: '/admin-api' // proxied to BACKEND_URL/admin-api in vite.config.js
})

const TRANSIENT_TOAST_INTERVAL_MS = 30_000
let lastTransientToastAt = 0

function redirectToLogin() {
  if (window.location.pathname.startsWith('/admin/login')) return
  window.location.href = buildLoginRedirect(window.location)
}

function notifyTransientRefreshError() {
  const now = Date.now()
  if (now - lastTransientToastAt < TRANSIENT_TOAST_INTERVAL_MS) return
  lastTransientToastAt = now
  ElMessage.warning({ message: 'Connection problem. Retrying…', grouping: true })
}

// /refresh and /logout go through plain axios so they bypass the interceptors below
export const authSession = createAuthSession({
  storage: window.localStorage,
  http: axios,
  locks: typeof navigator !== 'undefined' && navigator.locks?.request ? navigator.locks : null,
  onSessionEnded: redirectToLogin,
  onTransientError: notifyTransientRefreshError
})

// attach token, refreshing first if it has already expired
api.interceptors.request.use(async (config) => {
  const token = await authSession.getValidAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// safety net: a 401 still triggers refresh → retry once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Only handle 401 and avoid infinite retry loops
    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (!authSession.getRefreshToken()) {
      authSession.endSession()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    // Another tab (or an earlier refresh) may already have replaced the token
    const current = authSession.getAccessToken()
    const token = current && originalRequest.headers.Authorization !== `Bearer ${current}`
      ? current
      : await authSession.refresh({ force: true })

    originalRequest.headers.Authorization = `Bearer ${token}`
    return api(originalRequest)
  }
)

let lifecycleInstalled = false

/** Proactive refresh on tab focus / reconnect and cross-tab sync via the storage event. */
export function installAuthLifecycle() {
  if (lifecycleInstalled) return
  lifecycleInstalled = true

  const refreshIfNeeded = () => {
    authSession.ensureFresh().catch(() => {})
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshIfNeeded()
  })
  window.addEventListener('focus', refreshIfNeeded)
  window.addEventListener('online', refreshIfNeeded)
  window.addEventListener('storage', (event) => {
    if (event.storageArea && event.storageArea !== window.localStorage) return
    authSession.handleStorageEvent(event)
  })

  if (authSession.getRefreshToken()) {
    authSession.schedule()
    refreshIfNeeded()
  }
}

export default api
