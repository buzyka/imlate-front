import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ACCESS_EXPIRES_AT_KEY,
  MIN_REFRESH_DELAY_MS,
  REFRESH_LEAD_MS,
  REFRESH_LOCK_NAME,
  SessionEndedError,
  TransientRefreshError,
  buildLoginRedirect,
  createAuthSession,
  decodeJwtExp,
  sanitizeRedirect,
} from './auth-session.js'

const NOW = 1_700_000_000_000

function makeJwt(payload) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${encode({ alg: 'HS256' })}.${encode(payload)}.signature`
}

function createStorage(initial = {}) {
  const map = new Map(Object.entries(initial))
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
    dump: () => Object.fromEntries(map),
  }
}

function createTimers() {
  const timers = new Map()
  let nextId = 0
  return {
    setTimer: (fn, ms) => {
      timers.set(++nextId, { fn, ms })
      return nextId
    },
    clearTimer: (id) => timers.delete(id),
    pending: () => [...timers.values()],
    fireAll: () => {
      const due = [...timers.entries()]
      timers.clear()
      due.forEach(([, { fn }]) => fn())
    },
  }
}

function createHttp(handler) {
  const calls = []
  return {
    calls,
    post: async (url, body, config) => {
      calls.push({ url, body, config })
      return handler(url, body, config, calls.length)
    },
  }
}

function httpError(status) {
  return Object.assign(new Error(`HTTP ${status}`), status ? { response: { status } } : {})
}

// Serialises callbacks like the Web Locks API does
function createLocks({ beforeAcquire } = {}) {
  let chain = Promise.resolve()
  const names = []
  return {
    names,
    request(name, callback) {
      names.push(name)
      const run = chain.then(async () => {
        await beforeAcquire?.()
        return callback()
      })
      chain = run.catch(() => {})
      return run
    },
  }
}

function setup({ storage: initial, http, locks = null, sleep } = {}) {
  const storage = createStorage(initial ?? {
    access_token: 'a1',
    refresh_token: 'r1',
    [ACCESS_EXPIRES_AT_KEY]: String(NOW + 30_000),
  })
  const timers = createTimers()
  const ended = []
  const transient = []
  const sleeps = []
  let clock = NOW
  const session = createAuthSession({
    storage,
    http: http ?? createHttp(async () => ({
      data: { access_token: 'a2', refresh_token: 'r2', expires_in: 1800 },
    })),
    now: () => clock,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
    locks,
    sleep: sleep ?? (async (ms) => { sleeps.push(ms) }),
    onSessionEnded: (info) => ended.push(info),
    onTransientError: (error) => transient.push(error),
  })
  return {
    session,
    storage,
    timers,
    ended,
    transient,
    sleeps,
    advance: (ms) => { clock += ms },
  }
}

test('decodeJwtExp returns exp in milliseconds and null for garbage', () => {
  assert.equal(decodeJwtExp(makeJwt({ exp: 1_700_000_100 })), 1_700_000_100_000)
  assert.equal(decodeJwtExp('not-a-jwt'), null)
  assert.equal(decodeJwtExp(makeJwt({ sub: 1 })), null)
  assert.equal(decodeJwtExp(undefined), null)
})

test('saveTokens stores access_expires_at from expires_in', () => {
  const { session, storage } = setup({ storage: {} })
  session.saveTokens({ access_token: 'a', refresh_token: 'r', expires_in: 1800 })
  assert.deepEqual(storage.dump(), {
    access_token: 'a',
    refresh_token: 'r',
    [ACCESS_EXPIRES_AT_KEY]: String(NOW + 1_800_000),
  })
})

test('saveTokens falls back to the JWT exp claim when expires_in is missing', () => {
  const { session, storage } = setup({ storage: {} })
  const token = makeJwt({ exp: NOW / 1000 + 600 })
  session.saveTokens({ access_token: token, refresh_token: 'r' })
  assert.equal(storage.getItem(ACCESS_EXPIRES_AT_KEY), String(NOW + 600_000))
})

test('proactive refresh is scheduled 60s before expiry', () => {
  const { session, timers } = setup({ storage: {} })
  session.saveTokens({ access_token: 'a', refresh_token: 'r', expires_in: 1800 })
  assert.deepEqual(timers.pending().map((t) => t.ms), [1_800_000 - REFRESH_LEAD_MS])
})

test('proactive refresh is never scheduled sooner than 5s from now', () => {
  const { session, timers } = setup({ storage: {} })
  session.saveTokens({ access_token: 'a', refresh_token: 'r', expires_in: 30 })
  assert.deepEqual(timers.pending().map((t) => t.ms), [MIN_REFRESH_DELAY_MS])
})

test('scheduled timer refreshes and reschedules for the new token', async () => {
  const http = createHttp(async () => ({
    data: { access_token: 'a2', refresh_token: 'r2', expires_in: 600 },
  }))
  const { session, timers, storage } = setup({ http })
  session.schedule()
  timers.fireAll()
  await session.refresh()
  assert.equal(http.calls.length, 1)
  assert.equal(http.calls[0].body.get('refresh_token'), 'r1')
  assert.equal(storage.getItem('refresh_token'), 'r2')
  assert.deepEqual(timers.pending().map((t) => t.ms), [600_000 - REFRESH_LEAD_MS])
})

test('concurrent refreshes in one tab share a single request', async () => {
  let release
  const http = createHttp(() => new Promise((resolve) => {
    release = () => resolve({ data: { access_token: 'a2', refresh_token: 'r2', expires_in: 1800 } })
  }))
  const { session } = setup({ http })
  const results = Promise.all([session.refresh(), session.refresh(), session.getValidAccessToken()])
  await new Promise((resolve) => setImmediate(resolve))
  release()
  // getValidAccessToken does not refresh a still-valid token, so it returns the old one
  assert.deepEqual(await results, ['a2', 'a2', 'a1'])
  assert.equal(http.calls.length, 1)
})

test('refresh uses the cross-tab lock and skips the network if another tab rotated the token', async () => {
  const http = createHttp(async () => {
    throw new Error('must not be called')
  })
  let storageRef
  const locks = createLocks({
    beforeAcquire: () => {
      // Another tab held the lock and rotated the token meanwhile
      storageRef.setItem('access_token', 'a-other')
      storageRef.setItem('refresh_token', 'r-other')
      storageRef.setItem(ACCESS_EXPIRES_AT_KEY, String(NOW + 1_800_000))
    },
  })
  const ctx = setup({ http, locks })
  storageRef = ctx.storage
  const changes = []
  ctx.session.subscribe(() => changes.push(ctx.storage.getItem('access_token')))

  assert.equal(await ctx.session.refresh(), 'a-other')
  assert.deepEqual(locks.names, [REFRESH_LOCK_NAME])
  assert.equal(http.calls.length, 0)
  assert.deepEqual(changes, ['a-other'])
  assert.deepEqual(ctx.timers.pending().map((t) => t.ms), [1_800_000 - REFRESH_LEAD_MS])
})

test('refresh under the lock calls /refresh when the stored token is unchanged', async () => {
  const locks = createLocks()
  const { session, storage } = setup({ locks })
  assert.equal(await session.refresh(), 'a2')
  assert.equal(storage.getItem('refresh_token'), 'r2')
})

test('without locks a 401 retries once with a token rotated by another tab', async () => {
  let storageRef
  const http = createHttp(async (url, body) => {
    if (body.get('refresh_token') === 'r1') throw httpError(401)
    return { data: { access_token: 'a3', refresh_token: 'r3', expires_in: 1800 } }
  })
  const sleep = async () => {
    storageRef.setItem('access_token', 'a2')
    storageRef.setItem('refresh_token', 'r2')
    storageRef.setItem(ACCESS_EXPIRES_AT_KEY, String(NOW + 10_000))
  }
  const ctx = setup({ http, sleep })
  storageRef = ctx.storage

  assert.equal(await ctx.session.refresh(), 'a3')
  assert.deepEqual(http.calls.map((c) => c.body.get('refresh_token')), ['r1', 'r2'])
  assert.deepEqual(ctx.ended, [])
})

test('without locks a 401 with an unchanged token ends the session', async () => {
  const http = createHttp(async () => {
    throw httpError(401)
  })
  const { session, storage, ended, sleeps, transient } = setup({ http })

  await assert.rejects(session.refresh(), SessionEndedError)
  assert.deepEqual(sleeps, [300])
  assert.equal(http.calls.length, 1)
  assert.deepEqual(storage.dump(), {})
  assert.deepEqual(ended, [{ remote: false }])
  assert.deepEqual(transient, [])
})

test('400 from /refresh ends the session', async () => {
  const http = createHttp(async () => {
    throw httpError(400)
  })
  const { session, ended } = setup({ http, locks: createLocks() })
  await assert.rejects(session.refresh(), SessionEndedError)
  assert.deepEqual(ended, [{ remote: false }])
})

for (const [label, error] of [['network error', httpError()], ['5xx', httpError(502)]]) {
  test(`${label} during refresh keeps tokens and reports a transient error`, async () => {
    const http = createHttp(async () => {
      throw error
    })
    const { session, storage, ended, transient } = setup({ http })
    const before = storage.dump()

    await assert.rejects(session.refresh(), TransientRefreshError)
    assert.deepEqual(storage.dump(), before)
    assert.deepEqual(ended, [])
    assert.equal(transient.length, 1)
  })
}

test('getValidAccessToken waits for a refresh when the token has expired', async () => {
  const { session, advance, storage } = setup()
  advance(31_000)
  assert.equal(await session.getValidAccessToken(), 'a2')
  assert.equal(storage.getItem('access_token'), 'a2')
})

test('ensureFresh refreshes only when the token expires within 60s', async () => {
  const http = createHttp(async () => ({
    data: { access_token: 'a2', refresh_token: 'r2', expires_in: 1800 },
  }))
  const { session } = setup({ http })
  assert.equal(await session.ensureFresh(), 'a2')
  assert.equal(await session.ensureFresh(), 'a2')
  assert.equal(http.calls.length, 1)
})

test('storage event with new tokens notifies listeners and reschedules', () => {
  const { session, storage, timers } = setup()
  const changes = []
  session.subscribe(() => changes.push(storage.getItem('access_token')))

  storage.setItem('access_token', 'a-other')
  storage.setItem(ACCESS_EXPIRES_AT_KEY, String(NOW + 900_000))
  session.handleStorageEvent({ key: 'access_token', oldValue: 'a1', newValue: 'a-other' })

  assert.deepEqual(changes, ['a-other'])
  assert.deepEqual(timers.pending().map((t) => t.ms), [900_000 - REFRESH_LEAD_MS])
})

test('storage event for unrelated keys is ignored', () => {
  const { session } = setup()
  let notified = false
  session.subscribe(() => { notified = true })
  session.handleStorageEvent({ key: 'theme', oldValue: 'dark', newValue: 'light' })
  assert.equal(notified, false)
})

test('logout in another tab ends the session here too', () => {
  const { session, storage, timers, ended } = setup()
  session.schedule()
  storage.removeItem('refresh_token')
  storage.removeItem('access_token')
  session.handleStorageEvent({ key: 'refresh_token', oldValue: 'r1', newValue: null })
  session.handleStorageEvent({ key: 'access_token', oldValue: 'a1', newValue: null })

  assert.deepEqual(ended, [{ remote: true }])
  assert.deepEqual(timers.pending(), [])
})

test('logout posts the refresh token as JSON and clears storage', async () => {
  const http = createHttp(async () => ({ data: { code: 200 } }))
  const { session, storage, timers, ended } = setup({ http, storage: {
    access_token: 'a1',
    refresh_token: 'r1',
    [ACCESS_EXPIRES_AT_KEY]: String(NOW + 30_000),
    user: '{"username":"admin"}',
  } })
  session.schedule()

  await session.logout()
  assert.equal(http.calls.length, 1)
  assert.equal(http.calls[0].url, '/logout')
  assert.deepEqual(http.calls[0].body, { refresh_token: 'r1' })
  assert.equal(http.calls[0].config.headers['Content-Type'], 'application/json')
  assert.deepEqual(storage.dump(), {})
  assert.deepEqual(timers.pending(), [])
  // a local logout redirects by itself, it is not a forced session end
  assert.deepEqual(ended, [])
})

test('logout clears storage even when the request fails', async () => {
  const http = createHttp(async () => {
    throw httpError(401)
  })
  const { session, storage } = setup({ http })
  await session.logout()
  assert.deepEqual(storage.dump(), {})
})

test('logout waits for an in-flight refresh and revokes the rotated token', async () => {
  const http = createHttp(async (url) => {
    if (url === '/refresh') return { data: { access_token: 'a2', refresh_token: 'r2', expires_in: 1800 } }
    return { data: { code: 200 } }
  })
  const { session, storage } = setup({ http })
  session.refresh()
  await session.logout()
  assert.deepEqual(http.calls.map((c) => c.url), ['/refresh', '/logout'])
  assert.deepEqual(http.calls[1].body, { refresh_token: 'r2' })
  assert.deepEqual(storage.dump(), {})
})

test('buildLoginRedirect keeps the current in-app route', () => {
  assert.equal(
    buildLoginRedirect({ pathname: '/admin/reports', search: '?from=2024-01-01' }),
    `/admin/login?redirect=${encodeURIComponent('/reports?from=2024-01-01')}`,
  )
  assert.equal(buildLoginRedirect({ pathname: '/admin/', search: '' }), '/admin/login')
  assert.equal(buildLoginRedirect({ pathname: '/admin/login', search: '?redirect=%2Fusers' }), '/admin/login')
})

test('sanitizeRedirect rejects external and protocol-relative targets', () => {
  assert.equal(sanitizeRedirect('/reports?x=1'), '/reports?x=1')
  assert.equal(sanitizeRedirect('//evil.com'), '/')
  assert.equal(sanitizeRedirect('/\\evil.com'), '/')
  assert.equal(sanitizeRedirect('https://evil.com'), '/')
  assert.equal(sanitizeRedirect(undefined), '/')
})
