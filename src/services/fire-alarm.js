import api from './api.js'
import { normalizeFireAlarmState } from '../features/fire-alarm.js'

export async function fetchFireAlarm() {
  const { data } = await api.get('/fire-alarm')
  return normalizeFireAlarmState(data)
}

export async function saveFireAlarm({ enabled, defaultDuration }) {
  const { data } = await api.post('/fire-alarm', {
    enabled,
    default_duration: defaultDuration,
  })
  return normalizeFireAlarmState(data)
}
