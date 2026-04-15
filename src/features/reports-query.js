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

export function buildReportsQuery({
  from,
  to,
  page,
  limit,
  isStudentFilter,
  statusFilter,
  gradeFilter,
}) {
  const params = new URLSearchParams()

  params.append('from', from)
  params.append('to', to)
  params.append('page', String(page))
  params.append('limit', String(limit))

  if (typeof isStudentFilter === 'boolean') {
    params.append('is_student', String(isStudentFilter))
  }

  if (VALID_SIGN_STATUSES.has(statusFilter)) {
    params.append('sign_status', statusFilter)
  }

  gradeFilter.forEach((grade) => {
    params.append('year_group', String(grade))
  })

  return params
}
