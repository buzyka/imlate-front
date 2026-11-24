// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ElementPlus from 'element-plus'
import FireAlarmControl from './FireAlarmControl.vue'
import { useFireAlarmStore } from '../stores/fireAlarm.js'
import { saveFireAlarm } from '../services/fire-alarm.js'

vi.mock('../services/fire-alarm.js', () => ({
  fetchFireAlarm: vi.fn(),
  saveFireAlarm: vi.fn(),
}))

let pinia

beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
  vi.mocked(saveFireAlarm).mockReset()
})

afterEach(() => {
  useFireAlarmStore().stopPolling()
  document.body.innerHTML = ''
})

function mountControl() {
  return mount(FireAlarmControl, {
    attachTo: document.body,
    global: { plugins: [pinia, ElementPlus] },
  })
}

function findDialogButton(label) {
  return [...document.body.querySelectorAll('.el-dialog button')].find((b) => b.textContent.trim() === label)
}

test('renders the Fire Alarm button as plain danger while the alarm is off', () => {
  const wrapper = mountControl()
  const button = wrapper.get('button')

  expect(button.text()).toBe('Fire Alarm')
  expect(button.classes()).toContain('el-button--danger')
  expect(button.classes()).toContain('is-plain')
})

test('opens the duration dialog with activation disabled until a duration is picked', async () => {
  const wrapper = mountControl()
  await wrapper.get('button').trigger('click')
  await flushPromises()

  expect(document.body.textContent).toContain('Select Fire Alarm Duration')
  expect(findDialogButton('Activate Fire Alarm').disabled).toBe(true)
})

test('clicking the button while the alarm is on deactivates it without a dialog', async () => {
  vi.mocked(saveFireAlarm).mockResolvedValue({
    enabled: false,
    default_duration: 0,
    remaining_seconds: 0,
    started_at: null,
  })
  const wrapper = mountControl()
  const store = useFireAlarmStore()
  store.enabled = true
  await flushPromises()

  expect(wrapper.get('button').classes()).toContain('fire-alarm-btn--active')

  await wrapper.get('button').trigger('click')
  await flushPromises()

  expect(saveFireAlarm).toHaveBeenCalledWith({ enabled: false, defaultDuration: 0 })
  expect(store.enabled).toBe(false)
  expect(document.body.textContent).not.toContain('Select Fire Alarm Duration')
})
