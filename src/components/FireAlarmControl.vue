<template>
  <el-button
    size="small"
    type="danger"
    :plain="!store.enabled"
    :class="{ 'fire-alarm-btn--active': store.enabled }"
    :loading="store.loading"
    @click="onClick"
  >Fire Alarm</el-button>

  <el-dialog
    v-model="dialogVisible"
    title="Select Fire Alarm Duration"
    width="420px"
    :close-on-click-modal="false"
    append-to-body
  >
    <p class="fire-alarm-hint">Choose how long the alarm mode should stay active.</p>
    <el-select v-model="selectedDuration" placeholder="Select duration" style="width:100%">
      <el-option v-for="d in FIRE_ALARM_DURATIONS" :key="d.value" :label="d.label" :value="d.value" />
    </el-select>
    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button
        type="danger"
        :loading="store.loading"
        :disabled="selectedDuration === null"
        @click="confirmActivate"
      >Activate Fire Alarm</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { FIRE_ALARM_DURATIONS } from '../features/fire-alarm.js'
import { useFireAlarmStore } from '../stores/fireAlarm.js'

const store = useFireAlarmStore()
const dialogVisible = ref(false)
const selectedDuration = ref(null)

function onClick() {
  if (store.enabled) {
    store.deactivate()
    return
  }
  selectedDuration.value = null
  dialogVisible.value = true
}

async function confirmActivate() {
  try {
    await store.activate(selectedDuration.value)
    dialogVisible.value = false
  } catch {
    // keep the dialog open, the store already reported the error
  }
}
</script>

<style scoped>
.fire-alarm-btn--active {
  background: var(--el-color-danger-dark-2);
  border-color: var(--el-color-danger-dark-2);
  color: #fff;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, .3);
}
.fire-alarm-hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #606266;
}
</style>
