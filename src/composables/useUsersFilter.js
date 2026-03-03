import { computed } from 'vue'

export function useUsersFilter(users, statusFilter, q) {
  const filteredUsers = computed(() => {
    let result = users.value

    if (statusFilter.value === 'signedIn') {
      result = result.filter(u => u.active === 'true')
    }

    if (statusFilter.value === 'signedOut') {
      result = result.filter(u => u.active === 'false')
    }

    if (statusFilter.value === 'notSigned') {
      result = result.filter(u => u.active === 'Not signed in')
    }

    const query = q.value.trim().toLowerCase()
    if (query) {
      result = result.filter(u =>
        ((u.name ?? '') + ' ' + (u.SurName ?? '')).toLowerCase().includes(query)
      )
    }

    return result
  })

  return { filteredUsers }
}