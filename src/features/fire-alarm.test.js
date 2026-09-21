import test from 'node:test'
import assert from 'node:assert/strict'

import {
  FIRE_ALARM_DURATIONS,
  FIRE_ALARM_POLL_INTERVAL_MS,
  createDefaultFireAlarmState,
  normalizeFireAlarmState,
} from './fire-alarm.js'

test('fire alarm offers 1, 2, 3 and 5 hour durations in seconds', () => {
  assert.deepEqual(
    FIRE_ALARM_DURATIONS.map((d) => d.value),
    [3600, 7200, 10800, 18000],
  )
  assert.deepEqual(
    FIRE_ALARM_DURATIONS.map((d) => d.label),
    ['1 hour', '2 hours', '3 hours', '5 hours'],
  )
})

test('fire alarm state is polled every ten minutes', () => {
  assert.equal(FIRE_ALARM_POLL_INTERVAL_MS, 600000)
})

test('fire alarm defaults to an inactive state', () => {
  assert.deepEqual(createDefaultFireAlarmState(), {
    enabled: false,
    default_duration: 0,
    remaining_seconds: 0,
    started_at: null,
  })
})

test('fire alarm state normalizes a full server response', () => {
  assert.deepEqual(
    normalizeFireAlarmState({
      default_duration: 3600,
      enabled: true,
      remaining_seconds: 3540,
      started_at: '2026-09-21T11:28:00Z',
    }),
    {
      enabled: true,
      default_duration: 3600,
      remaining_seconds: 3540,
      started_at: '2026-09-21T11:28:00Z',
    },
  )
})

test('fire alarm state falls back to defaults on empty or broken payloads', () => {
  assert.deepEqual(normalizeFireAlarmState({}), createDefaultFireAlarmState())
  assert.deepEqual(normalizeFireAlarmState(null), createDefaultFireAlarmState())
  assert.deepEqual(normalizeFireAlarmState('boom'), createDefaultFireAlarmState())
  assert.deepEqual(
    normalizeFireAlarmState({ enabled: true, default_duration: -5, remaining_seconds: 'abc' }),
    { enabled: true, default_duration: 0, remaining_seconds: 0, started_at: null },
  )
})

test('fire alarm state accepts numeric strings and camelCase keys', () => {
  assert.deepEqual(
    normalizeFireAlarmState({ enabled: 1, defaultDuration: '7200', remainingSeconds: '7100', startedAt: '2026-09-21T11:28:00Z' }),
    {
      enabled: true,
      default_duration: 7200,
      remaining_seconds: 7100,
      started_at: '2026-09-21T11:28:00Z',
    },
  )
})
