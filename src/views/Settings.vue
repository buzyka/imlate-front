<template>
  <div class="settings-page">
    <el-card class="settings-card">
      <template #header>
        <div class="settings-header">
          <div>
            <h2>Settings</h2>
            <p>Manage tracking page branding and animation timings.</p>
          </div>
          <el-button :loading="loading" @click="fetchTheme">Refresh</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="Theme" name="theme">
          <div class="theme-grid">
            <el-card
              v-for="slot in slotDefinitions"
              :key="slot.key"
              class="asset-card"
              shadow="hover"
            >
              <template #header>
                <div class="asset-card-header">
                  <div>
                    <strong>{{ slot.label }}</strong>
                    <p>{{ slot.help }}</p>
                  </div>
                  <el-tag :type="assetState(slot.key).is_custom ? 'success' : 'info'" size="small">
                    {{ assetState(slot.key).is_custom ? 'Custom' : 'Default' }}
                  </el-tag>
                </div>
              </template>

              <div class="asset-preview-wrap">
                <img
                  :src="assetState(slot.key).current_url"
                  :alt="slot.label"
                  class="asset-preview"
                >
              </div>

              <div class="asset-meta">
                <span>Accepted: {{ slot.acceptLabel }}</span>
                <span v-if="assetState(slot.key).updated_at">Updated: {{ formatDate(assetState(slot.key).updated_at) }}</span>
              </div>

              <input
                :ref="(el) => setFileInputRef(slot.key, el)"
                type="file"
                :accept="slot.accept"
                class="hidden-input"
                @change="onFileSelected(slot.key, $event)"
              >

              <div class="asset-actions">
                <el-button :loading="uploading[slot.key]" @click="openFilePicker(slot.key)">
                  Upload
                </el-button>
                <el-button
                  type="danger"
                  plain
                  :disabled="!assetState(slot.key).is_custom"
                  :loading="resetting[slot.key]"
                  @click="resetAsset(slot.key)"
                >
                  Reset
                </el-button>
              </div>
            </el-card>
          </div>

          <el-divider />

          <el-card shadow="never">
            <template #header>
              <div class="timing-header">
                <div>
                  <strong>Animation Duration</strong>
                  <p>Control how long welcome and goodbye GIFs stay visible on the tracking page.</p>
                </div>
              </div>
            </template>

            <el-form label-position="top" class="timing-form">
              <el-form-item label="Welcome animation (seconds)">
                <el-input-number
                  v-model="welcomeSeconds"
                  :min="1.8"
                  :max="60"
                  :step="0.1"
                  :precision="1"
                  controls-position="right"
                />
              </el-form-item>

              <el-form-item label="Goodbye animation (seconds)">
                <el-input-number
                  v-model="goodbyeSeconds"
                  :min="1.8"
                  :max="60"
                  :step="0.1"
                  :precision="1"
                  controls-position="right"
                />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :loading="savingSettings" @click="saveSettings">
                  Save timings
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  THEME_DEFAULTS,
  THEME_SLOTS,
  createDefaultTheme,
  fetchTheme as fetchThemeRequest,
  resetThemeAsset,
  saveThemeSettings,
  uploadThemeAsset
} from '../services/theme.js'

const activeTab = ref('theme')
const loading = ref(false)
const savingSettings = ref(false)
const welcomeSeconds = ref(1.8)
const goodbyeSeconds = ref(1.8)
const theme = ref({
  ...createDefaultTheme()
})

const uploading = ref({})
const resetting = ref({})
const fileInputs = ref({})

const slotDefinitions = THEME_SLOTS.map((slot) => ({
  key: slot.key,
  label: slot.label,
  help: slot.description,
  accept: slot.accept,
  acceptLabel: slot.accept.replaceAll('image/', '').toUpperCase().replaceAll(',', ', ')
}))

function assetState(slot) {
  return theme.value.assets?.[slot] || {
    current_url: '',
    default_url: '',
    is_custom: false,
    updated_at: ''
  }
}

function setThemePayload(data) {
  theme.value = data
  welcomeSeconds.value = msToSeconds(data.settings?.welcome_duration_ms ?? THEME_DEFAULTS.welcome_duration_ms)
  goodbyeSeconds.value = msToSeconds(data.settings?.goodbye_duration_ms ?? THEME_DEFAULTS.goodbye_duration_ms)
}

async function fetchTheme() {
  loading.value = true
  try {
    setThemePayload(await fetchThemeRequest())
  } catch (err) {
    ElMessage.error(err.response?.data?.error || 'Failed to load theme settings')
  } finally {
    loading.value = false
  }
}

function openFilePicker(slot) {
  fileInputs.value[slot]?.click()
}

async function onFileSelected(slot, event) {
  const file = event.target.files?.[0]
  if (!file) return

  uploading.value = { ...uploading.value, [slot]: true }
  try {
    setThemePayload(await uploadThemeAsset(slot, file))
    ElMessage.success('Asset uploaded')
  } catch (err) {
    ElMessage.error(err.response?.data?.error || 'Failed to upload asset')
  } finally {
    uploading.value = { ...uploading.value, [slot]: false }
    if (event.target) event.target.value = ''
  }
}

async function resetAsset(slot) {
  try {
    await ElMessageBox.confirm(
      `Reset ${slot.replaceAll('_', ' ')} to the default asset?`,
      'Confirm reset',
      { type: 'warning', confirmButtonText: 'Reset', cancelButtonText: 'Cancel' }
    )
  } catch {
    return
  }

  resetting.value = { ...resetting.value, [slot]: true }
  try {
    setThemePayload(await resetThemeAsset(slot))
    ElMessage.success('Asset reset')
  } catch (err) {
    ElMessage.error(err.response?.data?.error || 'Failed to reset asset')
  } finally {
    resetting.value = { ...resetting.value, [slot]: false }
  }
}

async function saveSettings() {
  savingSettings.value = true
  try {
    setThemePayload(await saveThemeSettings({
      welcome_duration_ms: secondsToMs(welcomeSeconds.value),
      goodbye_duration_ms: secondsToMs(goodbyeSeconds.value)
    }))
    ElMessage.success('Animation timings saved')
  } catch (err) {
    ElMessage.error(err.response?.data?.error || 'Failed to save animation timings')
  } finally {
    savingSettings.value = false
  }
}

function setFileInputRef(slot, el) {
  if (el) fileInputs.value[slot] = el
}

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

function msToSeconds(ms) {
  return Number((ms / 1000).toFixed(1))
}

function secondsToMs(seconds) {
  return Math.round(Number(seconds) * 1000)
}

onMounted(fetchTheme)
</script>

<style scoped>
.settings-page {
  display: grid;
  gap: 20px;
}

.settings-card :deep(.el-card__header) {
  padding-bottom: 18px;
}

.settings-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.settings-header h2,
.timing-header strong {
  margin: 0;
}

.settings-header p,
.timing-header p,
.asset-card-header p {
  margin: 6px 0 0;
  color: #606266;
  font-size: 13px;
  line-height: 1.4;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.asset-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.asset-preview-wrap {
  border: 1px solid #ebeef5;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f7f9fc 0%, #eef3f9 100%);
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.asset-preview {
  width: 100%;
  max-height: 240px;
  object-fit: contain;
  display: block;
}

.asset-meta {
  display: grid;
  gap: 4px;
  margin-bottom: 12px;
  color: #909399;
  font-size: 12px;
}

.asset-actions {
  display: flex;
  gap: 8px;
}

.timing-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.hidden-input {
  display: none;
}
</style>
