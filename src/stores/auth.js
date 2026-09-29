import { defineStore } from 'pinia'
import axios from 'axios'
import api, { authSession } from '../services/api.js'

function readUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

let unsubscribeSession = null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    user: readUser()
  }),
  getters: {
    userName: (state) => {
      if (state.user?.name && state.user?.surname) {
        return `${state.user.name} ${state.user.surname}`
      }
      return state.user?.name || state.user?.username || 'User'
    },
    userRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    async login(username, password) {
      const { data } = await axios.post('/login', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      })
      authSession.saveTokens(data)
      this.syncFromStorage()

      // Store username from login
      this.user = { username }
      localStorage.setItem('user', JSON.stringify(this.user))
      
      // Try to fetch full user profile
      await this.fetchUserProfile()
      
      return true
    },
    async fetchUserProfile() {
      try {
        const { data } = await api.get('/current-user')
        this.user = data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (e) {
        // /current-user endpoint may not exist, keep username from login
      }
    },
    // Keep state in sync with tokens rotated by refresh or changed in another tab
    startSessionSync() {
      if (unsubscribeSession) return
      unsubscribeSession = authSession.subscribe(() => this.syncFromStorage())
    },
    syncFromStorage() {
      this.token = localStorage.getItem('access_token') || ''
      this.refreshToken = localStorage.getItem('refresh_token') || ''
      this.user = readUser()
    },
    // Revokes the refresh token on the server; local state is cleared even if that fails
    async logout() {
      await authSession.logout()
      this.syncFromStorage()
    }
  }
})
