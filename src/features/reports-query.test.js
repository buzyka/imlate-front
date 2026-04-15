import test from 'node:test'
import assert from 'node:assert/strict'

import { buildReportsQuery, getReportsDateRange } from './reports-query.js'

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

test('omits sign_status when statusFilter is undefined', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: undefined,
    isStudentFilter: null,
    gradeFilter: [],
  })

  assert.equal(query.get('sign_status'), null)
})

test('omits sign_status when statusFilter is null', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: null,
    gradeFilter: [],
  })

  assert.equal(query.get('sign_status'), null)
})

test('includes sign_status when statusFilter is selected', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: 'signed_in',
    isStudentFilter: null,
    gradeFilter: [],
  })

  assert.equal(query.get('sign_status'), 'signed_in')
})

test('omits is_student when isStudentFilter is undefined', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: undefined,
    gradeFilter: [],
  })

  assert.equal(query.get('is_student'), null)
})

test('omits is_student when isStudentFilter is null', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: null,
    gradeFilter: [],
  })

  assert.equal(query.get('is_student'), null)
})

test('includes is_student when isStudentFilter is false', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: false,
    gradeFilter: [],
  })

  assert.equal(query.get('is_student'), 'false')
})

test('appends repeated year_group params for selected grades', () => {
  const query = buildReportsQuery({
    from: '2026-04-08',
    to: '2026-04-09',
    page: 1,
    limit: 20,
    statusFilter: null,
    isStudentFilter: true,
    gradeFilter: [3, 5],
  })

  assert.deepEqual(query.getAll('year_group'), ['3', '5'])
})
