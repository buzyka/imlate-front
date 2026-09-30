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

export const FORM_GROUP_MAX_LENGTH = 32

/** Trimmed form group for the API; blank means "no form group" (null). */
export function normalizeFormGroupInput(value) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || null
}

/** Keeps only well-formed entries of GET /visitors/form-groups. */
export function normalizeFormGroupList(data) {
  if (!Array.isArray(data)) return []
  return data.flatMap((entry) => {
    const value = typeof entry?.form_group === 'string' ? entry.form_group.trim() : ''
    if (!value) return []
    const grade = Number.isFinite(entry.grade) ? entry.grade : null
    const count = Number.isFinite(entry.visitors_count) ? entry.visitors_count : 0
    return [{ form_group: value, grade, visitors_count: count }]
  })
}

export function formatFormGroupHint(entry) {
  const parts = []
  if (Number.isFinite(entry?.grade)) parts.push(`grade ${entry.grade}`)
  const count = Number.isFinite(entry?.visitors_count) ? entry.visitors_count : 0
  parts.push(`${count} ${count === 1 ? 'visitor' : 'visitors'}`)
  return parts.join(' · ')
}

const compareFormGroups = (a, b) =>
  a.form_group.localeCompare(b.form_group, undefined, { numeric: true, sensitivity: 'base' })

/**
 * Autocomplete suggestions: case-insensitive "contains" match,
 * form groups of the selected grade first, then the rest.
 */
export function buildFormGroupSuggestions(list, query, grade = null) {
  const needle = typeof query === 'string' ? query.trim().toLowerCase() : ''
  const hasGrade = Number.isFinite(grade)

  return list
    .filter((entry) => !needle || entry.form_group.toLowerCase().includes(needle))
    .sort((a, b) => {
      if (hasGrade) {
        const rank = Number(b.grade === grade) - Number(a.grade === grade)
        if (rank) return rank
      }
      return compareFormGroups(a, b)
    })
    .map((entry) => ({
      value: entry.form_group,
      grade: entry.grade,
      visitorsCount: entry.visitors_count,
      hint: formatFormGroupHint(entry),
    }))
}

/** Existing form group equal to `value` ignoring case, or null. */
export function findFormGroupMatch(list, value) {
  const key = typeof value === 'string' ? value.trim().toLowerCase() : ''
  if (!key) return null
  return list.find((entry) => entry.form_group.toLowerCase() === key) || null
}
