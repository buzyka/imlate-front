import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const appSource = readFileSync(new URL('./App.vue', import.meta.url), 'utf8')

test('app shell keeps scrolling inside main content instead of the whole layout', () => {
  assert.match(appSource, /<el-main class="app-main">/)
  assert.match(appSource, /\.app-shell\s*\{[\s\S]*overflow:\s*hidden;/)
  assert.match(appSource, /\.app-content\s*\{[\s\S]*min-height:\s*0;/)
  assert.match(appSource, /\.app-main\s*\{[\s\S]*overflow:\s*auto;/)
})

test('header places the Fire Alarm control right before the user name', () => {
  const header = appSource.match(/<el-header[\s\S]*?<\/el-header>/)[0]
  const controlAt = header.indexOf('<FireAlarmControl />')
  const userNameAt = header.indexOf('auth.userName')
  assert.ok(controlAt > -1, 'Fire Alarm control is rendered in the header')
  assert.ok(controlAt < userNameAt, 'Fire Alarm control comes before the user name')
})

test('header turns into an alarm banner while Fire Alarm is enabled', () => {
  assert.match(appSource, /:class="\{ 'app-header--alarm': fireAlarm\.enabled \}"/)
  assert.match(appSource, /<div class="alarm-banner" v-if="fireAlarm\.enabled">/)
  assert.match(appSource, /\.app-header--alarm\s*\{[\s\S]*background:\s*var\(--el-color-danger\);/)
})
