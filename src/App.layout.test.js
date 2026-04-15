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
