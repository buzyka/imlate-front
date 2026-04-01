import api from './api.js'

export const THEME_DEFAULTS = Object.freeze({
  welcome_duration_ms: 1800,
  goodbye_duration_ms: 1800,
})

export const THEME_SLOTS = Object.freeze([
  {
    key: 'favicon',
    label: 'Favicon',
    description: 'Browser tab icon used on the tracking page.',
    accept: 'image/png',
    default_url: '/assets/img/favicon.png',
  },
  {
    key: 'logo_background',
    label: 'Logo background',
    description: 'Large background image shown on the welcome screen.',
    accept: 'image/png,image/jpeg,image/webp',
    default_url: '/assets/img/ISBLogo.jpg',
  },
  {
    key: 'welcome_animation',
    label: 'Welcome animation',
    description: 'Animation shown after a successful sign-in event.',
    accept: 'image/gif',
    default_url: '/assets/img/welcome-images-server.gif',
  },
  {
    key: 'goodbye_animation',
    label: 'Goodbye animation',
    description: 'Animation shown after a successful sign-out event.',
    accept: 'image/gif',
    default_url: '/assets/img/good-bye.gif',
  },
])

const slotByKey = Object.fromEntries(THEME_SLOTS.map((slot) => [slot.key, slot]))

export function createDefaultTheme() {
  return {
    assets: Object.fromEntries(
      THEME_SLOTS.map((slot) => [
        slot.key,
        {
          slot: slot.key,
          label: slot.label,
          description: slot.description,
          current_url: slot.default_url,
          default_url: slot.default_url,
          is_custom: false,
          content_type: null,
          size_bytes: null,
          updated_at: null,
          file_name: null,
        },
      ]),
    ),
    settings: { ...THEME_DEFAULTS },
  }
}

function toPositiveInteger(value, fallback) {
  const num = Number(value)
  return Number.isFinite(num) && num > 0 ? Math.trunc(num) : fallback
}

function resolveRootPayload(data) {
  if (data && typeof data === 'object') {
    if (data.theme && typeof data.theme === 'object') return data.theme
    return data
  }
  return {}
}

function normalizeAsset(slotKey, rawAsset = {}) {
  const slot = slotByKey[slotKey]
  if (!slot) return null

  return {
    slot: slotKey,
    label: slot.label,
    description: slot.description,
    current_url:
      rawAsset.current_url ||
      rawAsset.url ||
      rawAsset.path ||
      rawAsset.asset_url ||
      slot.default_url,
    default_url: slot.default_url,
    is_custom: Boolean(rawAsset.is_custom),
    content_type: rawAsset.content_type || rawAsset.mime_type || null,
    size_bytes: rawAsset.size_bytes ?? rawAsset.sizeBytes ?? null,
    updated_at: rawAsset.updated_at || rawAsset.updatedAt || null,
    file_name: rawAsset.file_name || rawAsset.filename || null,
  }
}

export function normalizeTheme(data) {
  const root = resolveRootPayload(data)
  const defaults = createDefaultTheme()
  const assetsSource = root.assets && typeof root.assets === 'object' ? root.assets : root
  const settingsSource = root.settings && typeof root.settings === 'object' ? root.settings : root

  return {
    assets: Object.fromEntries(
      THEME_SLOTS.map((slot) => [
        slot.key,
        normalizeAsset(slot.key, assetsSource[slot.key] || root[slot.key] || {}) || defaults.assets[slot.key],
      ]),
    ),
    settings: {
      welcome_duration_ms: toPositiveInteger(
        settingsSource.welcome_duration_ms ?? settingsSource.welcomeDurationMs,
        THEME_DEFAULTS.welcome_duration_ms,
      ),
      goodbye_duration_ms: toPositiveInteger(
        settingsSource.goodbye_duration_ms ?? settingsSource.goodbyeDurationMs,
        THEME_DEFAULTS.goodbye_duration_ms,
      ),
    },
  }
}

export async function fetchTheme() {
  const { data } = await api.get('/theme')
  return normalizeTheme(data)
}

export async function uploadThemeAsset(slot, file) {
  const formData = new FormData()
  formData.append('image', file)
  const { data } = await api.post(`/theme/assets/${slot}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return normalizeTheme(data)
}

export async function resetThemeAsset(slot) {
  const { data } = await api.delete(`/theme/assets/${slot}`)
  return normalizeTheme(data)
}

export async function saveThemeSettings(settings) {
  const { data } = await api.put('/theme/settings', settings)
  return normalizeTheme(data)
}
