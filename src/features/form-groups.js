export const EMPTY_VALUE = '—'

function matchesStudentScope(visitor, isStudentFilter) {
  if (typeof isStudentFilter !== 'boolean') return true
  return Boolean(visitor?.is_student) === isStudentFilter
}

export function getFormGroupOptions(visitors, isStudentFilter) {
  if (!Array.isArray(visitors)) return []

  // the backend matches form groups case-insensitively, so dedupe the same way
  // and keep the first spelling we meet
  const byKey = new Map()

  visitors.forEach((visitor) => {
    if (!matchesStudentScope(visitor, isStudentFilter)) return

    const value = typeof visitor?.form_group === 'string' ? visitor.form_group.trim() : ''
    if (!value) return

    const key = value.toLowerCase()
    if (!byKey.has(key)) byKey.set(key, value)
  })

  return [...byKey.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  )
}

export function formatFormGroup(value) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || EMPTY_VALUE
}
