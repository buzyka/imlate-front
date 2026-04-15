import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const reportsViewSource = readFileSync(new URL('./Reports.vue', import.meta.url), 'utf8')

test('reports keeps pagination inside the page container', () => {
  assert.match(
    reportsViewSource,
    /<div class="reports-page">[\s\S]*<div class="reports-pagination">[\s\S]*<\/div>\s*<\/div>\s*<\/template>/
  )
})
