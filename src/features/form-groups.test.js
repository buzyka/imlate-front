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

import {
  FORM_GROUP_MAX_LENGTH,
  buildFormGroupSuggestions,
  findFormGroupMatch,
  formatFormGroupHint,
  getFormGroupFilterOptions,
  normalizeFormGroupInput,
  normalizeFormGroupList,
} from './form-groups.js'

const FORM_GROUPS = [
  { form_group: 'Y5-A', grade: 5, visitors_count: 18 },
  { form_group: 'Y4-B', grade: 4, visitors_count: 20 },
  { form_group: 'Y4-A', grade: 4, visitors_count: 21 },
  { form_group: 'Staff', grade: null, visitors_count: 1 },
  { form_group: 'Nursery', grade: -1, visitors_count: 7 },
]

test('form group max length is 32', () => {
  assert.equal(FORM_GROUP_MAX_LENGTH, 32)
})

test('form group input is trimmed and blank becomes null', () => {
  assert.equal(normalizeFormGroupInput('  Y4-A '), 'Y4-A')
  assert.equal(normalizeFormGroupInput('   '), null)
  assert.equal(normalizeFormGroupInput(''), null)
  assert.equal(normalizeFormGroupInput(null), null)
})

test('form group list keeps only well-formed entries', () => {
  assert.deepEqual(normalizeFormGroupList(null), [])
  assert.deepEqual(
    normalizeFormGroupList([
      { form_group: ' Y4-A ', grade: 4, visitors_count: 21 },
      { form_group: 'Staff', grade: null },
      { form_group: '  ', grade: 4, visitors_count: 1 },
      { grade: 4 },
      null,
    ]),
    [
      { form_group: 'Y4-A', grade: 4, visitors_count: 21 },
      { form_group: 'Staff', grade: null, visitors_count: 0 },
    ],
  )
})

test('form group hint shows grade and visitor count', () => {
  assert.equal(formatFormGroupHint(FORM_GROUPS[2]), 'grade 4 · 21 visitors')
  assert.equal(formatFormGroupHint(FORM_GROUPS[3]), '1 visitor')
  assert.equal(formatFormGroupHint(FORM_GROUPS[4]), 'grade -1 · 7 visitors')
})

test('form group suggestions match "contains" case-insensitively', () => {
  assert.deepEqual(
    buildFormGroupSuggestions(FORM_GROUPS, 'a').map((s) => s.value),
    ['Staff', 'Y4-A', 'Y5-A'],
  )
  assert.deepEqual(buildFormGroupSuggestions(FORM_GROUPS, ' y4 ').map((s) => s.value), ['Y4-A', 'Y4-B'])
})

test('form group suggestions list the selected grade first', () => {
  assert.deepEqual(
    buildFormGroupSuggestions(FORM_GROUPS, 'a', 4).map((s) => s.value),
    ['Y4-A', 'Staff', 'Y5-A'],
  )
})

test('empty query suggests all form groups, selected grade first', () => {
  assert.deepEqual(
    buildFormGroupSuggestions(FORM_GROUPS, '', 4).map((s) => s.value),
    ['Y4-A', 'Y4-B', 'Nursery', 'Staff', 'Y5-A'],
  )
  assert.equal(buildFormGroupSuggestions(FORM_GROUPS, '').length, FORM_GROUPS.length)
})

test('form group suggestions carry a display hint', () => {
  assert.deepEqual(buildFormGroupSuggestions(FORM_GROUPS, 'Y4-A'), [
    { value: 'Y4-A', grade: 4, visitorsCount: 21, hint: 'grade 4 · 21 visitors' },
  ])
})

test('form group match ignores case and surrounding spaces', () => {
  assert.equal(findFormGroupMatch(FORM_GROUPS, 'Y4-A'), FORM_GROUPS[2])
  assert.equal(findFormGroupMatch(FORM_GROUPS, ' y4-a '), FORM_GROUPS[2])
  assert.equal(findFormGroupMatch(FORM_GROUPS, 'Y6-A'), null)
  assert.equal(findFormGroupMatch(FORM_GROUPS, ''), null)
})

test('reports filter options list all form groups when no visitor type is selected', () => {
  assert.deepEqual(getFormGroupFilterOptions(FORM_GROUPS, null), ['Nursery', 'Staff', 'Y4-A', 'Y4-B', 'Y5-A'])
  assert.deepEqual(getFormGroupFilterOptions(null, null), [])
})

test('reports filter options infer students from a positive grade', () => {
  assert.deepEqual(getFormGroupFilterOptions(FORM_GROUPS, true), ['Y4-A', 'Y4-B', 'Y5-A'])
})

test('reports filter options treat groups without a positive grade as staff', () => {
  assert.deepEqual(getFormGroupFilterOptions(FORM_GROUPS, false), ['Nursery', 'Staff'])
})

test('reports filter options dedupe case-insensitively across grades', () => {
  assert.deepEqual(
    getFormGroupFilterOptions([
      { form_group: 'Y4-A', grade: 4, visitors_count: 20 },
      { form_group: 'y4-a', grade: 5, visitors_count: 1 },
    ], null),
    ['Y4-A'],
  )
})
