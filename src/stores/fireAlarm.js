import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { fetchFireAlarm, saveFireAlarm } from '../services/fire-alarm.js'
import { FIRE_ALARM_POLL_INTERVAL_MS, createDefaultFireAlarmState } from '../features/fire-alarm.js'

export const useFireAlarmStore = defineStore('fireAlarm', {
  state: () => ({
    enabled: false,
    defaultDuration: 0,
    remainingSeconds: 0,
    startedAt: null,
    loading: false,
    pollTimer: null
  }),
  actions: {
    applyState(state) {
      this.enabled = state.enabled
      this.defaultDuration = state.default_duration
      this.remainingSeconds = state.remaining_seconds
      this.startedAt = state.started_at
    },
    async load() {
      try {
        this.applyState(await fetchFireAlarm())
      } catch (e) {
        // background poll must stay silent, keep the last known state
        console.warn('Failed to load Fire Alarm state', e)
      }
    },
    async activate(durationSeconds) {
      this.loading = true
      try {
        this.applyState(await saveFireAlarm({ enabled: true, defaultDuration: durationSeconds }))
        this.restartPolling()
        ElMessage.success('Fire Alarm activated')
      } catch (err) {
        ElMessage.error(err.response?.data?.error || 'Failed to activate Fire Alarm')
        throw err
      } finally {
        this.loading = false
      }
    },
    async deactivate() {
      this.loading = true
      try {
        this.applyState(await saveFireAlarm({ enabled: false, defaultDuration: 0 }))
        this.restartPolling()
        ElMessage.success('Fire Alarm deactivated')
      } catch (err) {
        ElMessage.error(err.response?.data?.error || 'Failed to deactivate Fire Alarm')
      } finally {
        this.loading = false
      }
    },
    startPolling() {
      if (this.pollTimer) return
      this.load()
      this.pollTimer = setInterval(() => this.load(), FIRE_ALARM_POLL_INTERVAL_MS)
    },
    stopPolling() {
      if (!this.pollTimer) return
      clearInterval(this.pollTimer)
      this.pollTimer = null
    },
    restartPolling() {
      // state has just arrived from the server, only reset the countdown
      this.stopPolling()
      this.pollTimer = setInterval(() => this.load(), FIRE_ALARM_POLL_INTERVAL_MS)
    },
    reset() {
      this.stopPolling()
      this.applyState(createDefaultFireAlarmState())
      this.loading = false
    }
  }
})
