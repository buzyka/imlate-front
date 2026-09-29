import test from 'node:test'
import assert from 'node:assert/strict'

import { EMPTY_VALUE, formatFormGroup, getFormGroupOptions } from './form-groups.js'

test('form group options drop null and blank values', () => {
  assert.deepEqual(
    getFormGroupOptions([
      { is_student: true, form_group: '6 A' },
      { is_student: true, form_group: null },
      { is_student: true, form_group: '   ' },
      { is_student: true },
    ], null),
    ['6 A'],
  )
})

test('form group options are distinct and trimmed', () => {
  assert.deepEqual(
    getFormGroupOptions([
      { is_student: true, form_group: '6 A' },
      { is_student: true, form_group: ' 6 A ' },
      { is_student: true, form_group: '6 B' },
    ], null),
    ['6 A', '6 B'],
  )
})

test('form group options dedupe case-insensitively and keep the first spelling', () => {
  assert.deepEqual(
    getFormGroupOptions([
      { is_student: true, form_group: 'Y6-c' },
      { is_student: true, form_group: 'Y6-C' },
    ], null),
    ['Y6-c'],
  )
})

test('form group options use a natural sort so 10 A comes after 9 B', () => {
  assert.deepEqual(
    getFormGroupOptions([
      { is_student: true, form_group: '10 A' },
      { is_student: true, form_group: '9 B' },
      { is_student: true, form_group: '2 C' },
    ], null),
    ['2 C', '9 B', '10 A'],
  )
})

test('form group options follow the student filter', () => {
  const visitors = [
    { is_student: true, form_group: '6 A' },
    { is_student: false, form_group: 'Staff 1' },
  ]

  assert.deepEqual(getFormGroupOptions(visitors, true), ['6 A'])
  assert.deepEqual(getFormGroupOptions(visitors, false), ['Staff 1'])
  assert.deepEqual(getFormGroupOptions(visitors, null), ['6 A', 'Staff 1'])
})

test('form group options tolerate a missing visitor list', () => {
  assert.deepEqual(getFormGroupOptions(undefined, null), [])
  assert.deepEqual(getFormGroupOptions(null, true), [])
})

test('form group cells render the value or a dash when empty', () => {
  assert.equal(formatFormGroup('6 A'), '6 A')
  assert.equal(formatFormGroup(null), EMPTY_VALUE)
  assert.equal(formatFormGroup(''), EMPTY_VALUE)
  assert.equal(formatFormGroup('   '), EMPTY_VALUE)
})
