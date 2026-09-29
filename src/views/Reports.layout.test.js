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

test('reports requests the report over POST, not the deprecated GET', () => {
  assert.match(reportsViewSource, /api\.post\('\/reports\/visits', buildBody\(\)\)/)
  assert.doesNotMatch(reportsViewSource, /api\.get\(`?\/reports\/visits/)
})

test('form group filter sits after the grade filter', () => {
  const filters = reportsViewSource.match(/<div class="filters">[\s\S]*?<\/el-skeleton>/)[0]
  const gradeAt = filters.indexOf('v-model="gradeFilter"')
  const formGroupAt = filters.indexOf('v-model="formGroupFilter"')

  assert.ok(gradeAt > -1, 'grade filter is rendered')
  assert.ok(formGroupAt > gradeAt, 'form group filter comes after the grade filter')
  assert.match(filters, /placeholder="All form groups"/)
})

test('grade and form group filters disable each other with a hint', () => {
  assert.match(reportsViewSource, /<el-select v-model="gradeFilter"[\s\S]*?:disabled="isGradeDisabled"/)
  assert.match(reportsViewSource, /<el-select v-model="formGroupFilter"[\s\S]*?:disabled="isFormGroupDisabled"/)
  assert.match(reportsViewSource, /isGradeDisabledByFormGroup = computed\(\(\) => formGroupFilter\.value\.length > 0\)/)
  assert.match(reportsViewSource, /isFormGroupDisabled = computed\(\(\) => gradeFilter\.value\.length > 0\)/)
  assert.match(reportsViewSource, /isGradeDisabledByFormGroup\.value\) return 'Clear the form group filter to filter by grade'/)
  assert.match(reportsViewSource, /isFormGroupDisabled\.value\) return 'Clear the grade filter to filter by form group'/)
})

test('results table shows a form group column after surname', () => {
  const table = reportsViewSource.match(/<el-table [\s\S]*?<\/el-table>/)[0]
  const surnameAt = table.indexOf('prop="surname"')
  const formGroupAt = table.indexOf('prop="form_group"')

  assert.ok(formGroupAt > surnameAt, 'form group column comes after surname')
  assert.match(table, /prop="form_group" label="Form group"[^>]*sortable/)
  assert.match(table, /formatFormGroup\(scope\.row\.form_group\)/)
})
