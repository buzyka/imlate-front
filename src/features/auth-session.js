export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'
export const ACCESS_EXPIRES_AT_KEY = 'access_expires_at'
export const USER_KEY = 'user'

export const REFRESH_LOCK_NAME = 'isb-auth-refresh'
// Refresh this long before the access token expires
export const REFRESH_LEAD_MS = 60_000
// Never schedule a proactive refresh sooner than this
export const MIN_REFRESH_DELAY_MS = 5_000
// Wait before re-reading storage when /refresh returns 401 without Web Locks
export const MULTI_TAB_RETRY_DELAY_MS = 300
export const LOGOUT_TIMEOUT_MS = 5_000

const MAX_TIMEOUT_MS = 2 ** 31 - 1
const SESSION_KEYS = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ACCESS_EXPIRES_AT_KEY]

/** Refresh token is definitively rejected (400/401): the session is over. */
export class SessionEndedError extends Error {
  constructor(message = 'Session ended', options) {
    super(message, options)
    this.name = 'SessionEndedError'
  }
}

/** Refresh failed for a recoverable reason (network error, 5xx): keep tokens and retry later. */
export class TransientRefreshError extends Error {
  constructor(message = 'Token refresh failed', options) {
    super(message, options)
    this.name = 'TransientRefreshError'
  }
}

/** Returns the JWT `exp` claim in milliseconds, or null if the token can't be decoded. */
export function decodeJwtExp(token) {
  if (typeof token !== 'string') return null
  const payload = token.split('.')[1]
  if (!payload) return null
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const { exp } = JSON.parse(atob(padded))
    return typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 : null
  } catch {
    return null
  }
}

/** Absolute expiry (ms) from a /login or /refresh response: `expires_in` first, JWT `exp` as fallback. */
export function computeExpiresAt(data, now) {
  const expiresIn = Number(data?.expires_in)
  if (Number.isFinite(expiresIn) && expiresIn > 0) return now + expiresIn * 1000
  return decodeJwtExp(data?.access_token)
}

/** Accepts only in-app paths ("/reports"), never protocol-relative or absolute URLs. */
export function sanitizeRedirect(value) {
  if (typeof value !== 'string') return '/'
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return '/'
  return value
}

/** Login URL that brings the user back to the current page after re-login. */
export function buildLoginRedirect(location, base = '/admin') {
  const pathname = location?.pathname || '/'
  let path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  if (!path.startsWith('/')) path = `/${path}`
  const target = sanitizeRedirect(path + (location?.search || ''))
  if (target === '/' || target.startsWith('/login')) return `${base}/login`
  return `${base}/login?redirect=${encodeURIComponent(target)}`
}

function classifyRefreshError(error) {
  if (error instanceof SessionEndedError || error instanceof TransientRefreshError) return error
  const status = error?.response?.status
  if (status === 400 || status === 401) {
    return new SessionEndedError('Refresh token rejected', { cause: error })
  }
  return new TransientRefreshError('Token refresh failed', { cause: error })
}

export function createAuthSession({
  storage,
  http,
  now = () => Date.now(),
  setTimer = (fn, ms) => setTimeout(fn, ms),
  clearTimer = (id) => clearTimeout(id),
  locks = null,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  onSessionEnded = () => {},
  onTransientError = () => {},
  refreshUrl = '/refresh',
  logoutUrl = '/logout',
} = {}) {
  const listeners = new Set()
  let timerId = null
  let inFlight = null
  let ended = false

  const getAccessToken = () => storage.getItem(ACCESS_TOKEN_KEY)
  const getRefreshToken = () => storage.getItem(REFRESH_TOKEN_KEY)

  function getExpiresAt() {
    const stored = Number(storage.getItem(ACCESS_EXPIRES_AT_KEY))
    if (Number.isFinite(stored) && stored > 0) return stored
    return decodeJwtExp(getAccessToken())
  }

  /** True when there is no access token or it expires within `ms`. Unknown expiry counts as valid. */
  function expiresWithin(ms) {
    if (!getAccessToken()) return true
    const expiresAt = getExpiresAt()
    if (expiresAt === null) return false
    return expiresAt - now() < ms
  }

  const isExpired = () => expiresWithin(0)

  function notify() {
    listeners.forEach((listener) => listener())
  }

  function subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function cancel() {
    if (timerId !== null) clearTimer(timerId)
    timerId = null
  }

  function schedule() {
    cancel()
    if (!getRefreshToken()) return
    const expiresAt = getExpiresAt()
    if (expiresAt === null) return
    const delay = Math.min(
      Math.max(expiresAt - REFRESH_LEAD_MS - now(), MIN_REFRESH_DELAY_MS),
      MAX_TIMEOUT_MS,
    )
    timerId = setTimer(() => {
      timerId = null
      refresh().catch(() => {})
    }, delay)
  }

  function saveTokens(data) {
    if (!data?.access_token) throw new Error('Auth response has no access_token')
    storage.setItem(ACCESS_TOKEN_KEY, data.access_token)
    if (data.refresh_token) storage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
    const expiresAt = computeExpiresAt(data, now())
    if (expiresAt === null) storage.removeItem(ACCESS_EXPIRES_AT_KEY)
    else storage.setItem(ACCESS_EXPIRES_AT_KEY, String(expiresAt))
    ended = false
    notify()
    schedule()
    return data.access_token
  }

  function clearTokens() {
    cancel()
    storage.removeItem(ACCESS_TOKEN_KEY)
    storage.removeItem(REFRESH_TOKEN_KEY)
    storage.removeItem(ACCESS_EXPIRES_AT_KEY)
    storage.removeItem(USER_KEY)
  }

  function endSession({ remote = false } = {}) {
    clearTokens()
    if (ended) return
    ended = true
    notify()
    onSessionEnded({ remote })
  }

  /** Another tab already rotated the token: start using what it stored. */
  function adoptStoredTokens() {
    notify()
    schedule()
    return getAccessToken()
  }

  async function requestRefresh(refreshToken) {
    let data
    try {
      const response = await http.post(
        refreshUrl,
        new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      data = response.data
    } catch (error) {
      throw classifyRefreshError(error)
    }
    // Logged out elsewhere while the request was in flight: don't resurrect the session
    if (!getRefreshToken()) throw new SessionEndedError('Logged out during refresh')
    try {
      return saveTokens(data)
    } catch (error) {
      throw new TransientRefreshError('Invalid refresh response', { cause: error })
    }
  }

  async function refreshUnderLock(usedToken, force) {
    const stored = getRefreshToken()
    if (!stored) throw new SessionEndedError('Logged out in another tab')
    if (stored !== usedToken || (!force && !expiresWithin(REFRESH_LEAD_MS))) {
      return adoptStoredTokens()
    }
    return requestRefresh(stored)
  }

  async function refreshWithoutLock(usedToken) {
    try {
      return await requestRefresh(usedToken)
    } catch (error) {
      if (!(error instanceof SessionEndedError)) throw error
      // Another tab may have rotated the token right before us
      await sleep(MULTI_TAB_RETRY_DELAY_MS)
      const latest = getRefreshToken()
      if (!latest || latest === usedToken) throw error
      if (!expiresWithin(REFRESH_LEAD_MS)) return adoptStoredTokens()
      return requestRefresh(latest)
    }
  }

  async function runRefresh(force) {
    try {
      const usedToken = getRefreshToken()
      if (!usedToken) throw new SessionEndedError('No refresh token')
      if (locks) {
        return await locks.request(REFRESH_LOCK_NAME, () => refreshUnderLock(usedToken, force))
      }
      return await refreshWithoutLock(usedToken)
    } catch (error) {
      const classified = classifyRefreshError(error)
      if (classified instanceof SessionEndedError) endSession()
      else onTransientError(classified)
      throw classified
    }
  }

  /**
   * Single-flight refresh: concurrent callers in this tab share one promise,
   * and Web Locks serialise refreshes across tabs.
   * `force` skips the "access token is still fresh" shortcut (used after a 401).
   */
  function refresh({ force = false } = {}) {
    if (!inFlight) {
      inFlight = runRefresh(force).finally(() => {
        inFlight = null
      })
    }
    return inFlight
  }

  /** Refresh if the access token expires within `threshold` ms. */
  async function ensureFresh({ threshold = REFRESH_LEAD_MS } = {}) {
    if (!getRefreshToken()) return null
    if (expiresWithin(threshold)) return refresh()
    return getAccessToken()
  }

  /** Access token for an outgoing request; waits for a refresh if it has already expired. */
  async function getValidAccessToken() {
    if (getRefreshToken() && isExpired()) return refresh()
    return getAccessToken()
  }

  function handleStorageEvent(event) {
    const key = event?.key
    // key === null means storage.clear() in another tab
    if (key !== null && !SESSION_KEYS.includes(key)) return
    if (!getRefreshToken()) {
      if (key !== null && event.oldValue === null) return
      cancel()
      endSession({ remote: true })
      return
    }
    ended = false
    notify()
    schedule()
  }

  async function logout() {
    // Let a running refresh finish so we revoke the newest refresh token
    if (inFlight) await inFlight.catch(() => {})
    cancel()
    const refreshToken = getRefreshToken()
    try {
      if (refreshToken) {
        await http.post(
          logoutUrl,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' }, timeout: LOGOUT_TIMEOUT_MS },
        )
      }
    } catch {
      // Logout must succeed locally even if the server is unreachable
    } finally {
      clearTokens()
      ended = true
      notify()
    }
  }

  return {
    getAccessToken,
    getRefreshToken,
    getExpiresAt,
    expiresWithin,
    isExpired,
    subscribe,
    schedule,
    cancel,
    saveTokens,
    endSession,
    refresh,
    ensureFresh,
    getValidAccessToken,
    handleStorageEvent,
    logout,
  }
}
