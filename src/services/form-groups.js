import api from './api.js'
import { normalizeFormGroupList } from '../features/form-groups.js'

// Cached for the whole session; concurrent callers share one request
let cached = null

export function loadFormGroups({ force = false } = {}) {
  if (force) cached = null
  if (!cached) {
    cached = api.get('/visitors/form-groups')
      .then(({ data }) => normalizeFormGroupList(data))
      .catch(() => {
        // Suggestions are optional: the field keeps working as plain text
        cached = null
        return []
      })
  }
  return cached
}
