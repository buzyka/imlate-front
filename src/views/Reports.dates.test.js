import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const reportsViewSource = readFileSync(new URL('./Reports.vue', import.meta.url), 'utf8')

test('reports uses a dynamic date range helper instead of hardcoded dates', () => {
  assert.doesNotMatch(reportsViewSource, /2026-04-08|2026-04-09/)
  assert.match(reportsViewSource, /getReportsDateRange/)
})
