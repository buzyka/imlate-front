export const FIRE_ALARM_DURATIONS = Object.freeze([
  Object.freeze({ label: '1 hour', value: 3600 }),
  Object.freeze({ label: '2 hours', value: 7200 }),
  Object.freeze({ label: '3 hours', value: 10800 }),
  Object.freeze({ label: '5 hours', value: 18000 }),
])

export const FIRE_ALARM_POLL_INTERVAL_MS = 10 * 60 * 1000

export const FIRE_ALARM_BANNER_TEXT = 'Fire Alarm is active'

export function createDefaultFireAlarmState() {
  return {
    enabled: false,
    default_duration: 0,
    remaining_seconds: 0,
    started_at: null,
  }
}

function toNonNegativeInteger(value) {
  const num = Number(value)
  return Number.isFinite(num) && num > 0 ? Math.trunc(num) : 0
}

export function normalizeFireAlarmState(data) {
  const root = data && typeof data === 'object' ? data : {}

  return {
    enabled: Boolean(root.enabled),
    default_duration: toNonNegativeInteger(root.default_duration ?? root.defaultDuration),
    remaining_seconds: toNonNegativeInteger(root.remaining_seconds ?? root.remainingSeconds),
    started_at: root.started_at || root.startedAt || null,
  }
}
