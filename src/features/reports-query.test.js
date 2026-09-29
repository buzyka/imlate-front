import test from 'node:test'
import assert from 'node:assert/strict'

import { buildReportsRequestBody, getReportsDateRange } from './reports-query.js'

test('returns today and tomorrow for a mid-month local date', () => {
  assert.deepEqual(
    getReportsDateRange(new Date(2026, 3, 15, 10, 30, 0)),
    { from: '2026-04-15', to: '2026-04-16' }
  )
})

test('rolls over to the next month when today is the last day of the month', () => {
  assert.deepEqual(
    getReportsDateRange(new Date(2026, 0, 31, 23, 59, 59)),
    { from: '2026-01-31', to: '2026-02-01' }
  )
})

test('rolls over to the next year when today is the last day of the year', () => {
  assert.deepEqual(
    getReportsDateRange(new Date(2026, 11, 31, 8, 0, 0)),
    { from: '2026-12-31', to: '2027-01-01' }
  )
})

test('carries the date range and pagination into the request body', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 2,
    limit: 20,
    statusFilter: null,
    isStudentFilter: null,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.equal(body.from, '2026-04-08')
  assert.equal(body.to, '2026-04-09')
  assert.equal(body.page, 2)
  assert.equal(body.limit, 20)
  assert.deepEqual(body.filters, {})
})

test('omits sign_status when statusFilter is undefined', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: undefined,
    isStudentFilter: null,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.equal('sign_status' in body.filters, false)
})

test('omits sign_status when statusFilter is null', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: null,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.equal('sign_status' in body.filters, false)
})

test('includes sign_status when statusFilter is selected', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: 'signed_in',
    isStudentFilter: null,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.deepEqual(body.filters.sign_status, ['signed_in'])
})

test('omits is_student when isStudentFilter is undefined', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: undefined,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.equal('is_student' in body.filters, false)
})

test('omits is_student when isStudentFilter is null', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: null,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.equal('is_student' in body.filters, false)
})

test('includes is_student when isStudentFilter is false', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: false,
    gradeFilter: [],
    formGroupFilter: [],
  })

  assert.equal(body.filters.is_student, false)
})

test('sends year_group as numbers when only grades are selected', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: true,
    gradeFilter: [3, 5],
    formGroupFilter: [],
  })

  assert.deepEqual(body.filters.year_group, [3, 5])
  assert.equal('form_group' in body.filters, false)
})

test('sends form_group when only form groups are selected', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: true,
    gradeFilter: [],
    formGroupFilter: ['6 A', '6 B'],
  })

  assert.deepEqual(body.filters.form_group, ['6 A', '6 B'])
  assert.equal('year_group' in body.filters, false)
})

test('form group wins when a restored state carries both filters', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: true,
    gradeFilter: [5],
    formGroupFilter: ['6 A'],
  })

  assert.deepEqual(body.filters.form_group, ['6 A'])
  assert.equal('year_group' in body.filters, false)
})

test('drops blank form groups and falls back to grades when none survive', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: true,
    gradeFilter: [5],
    formGroupFilter: ['   ', ''],
  })

  assert.equal('form_group' in body.filters, false)
  assert.deepEqual(body.filters.year_group, [5])
})

test('tolerates missing filter lists', () => {
  const body = buildReportsRequestBody({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: null,
  })

  assert.deepEqual(body.filters, {})
})
