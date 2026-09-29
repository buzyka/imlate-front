const VALID_SIGN_STATUSES = new Set(['signed_in', 'signed_out', 'not_signed'])

function formatReportsDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getReportsDateRange(now = new Date()) {
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return {
    from: formatReportsDate(now),
    to: formatReportsDate(tomorrow),
  }
}

function toList(value) {
  return Array.isArray(value) ? value : []
}

function normalizeFormGroups(formGroupFilter) {
  return toList(formGroupFilter)
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)
}

export function buildReportsRequestBody({
  from,
  to,
  page,
  limit,
  isStudentFilter,
  statusFilter,
  gradeFilter,
  formGroupFilter,
}) {
  const filters = {}

  if (typeof isStudentFilter === 'boolean') {
    filters.is_student = isStudentFilter
  }

  // the backend expects a list here, even for the single status the UI offers
  if (VALID_SIGN_STATUSES.has(statusFilter)) {
    filters.sign_status = [statusFilter]
  }

  // year group and form group are mutually exclusive: a form group such as "6 A"
  // already implies its year group, so sending both can only contradict itself.
  // If a restored state carries both, form group wins.
  const formGroups = normalizeFormGroups(formGroupFilter)
  const grades = toList(gradeFilter)

  if (formGroups.length) {
    filters.form_group = formGroups
  } else if (grades.length) {
    filters.year_group = grades.map(Number)
  }

  return { from, to, page, limit, filters }
}
