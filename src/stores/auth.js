import { defineStore } from 'pinia'
import axios from 'axios'
import api from '../services/api.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null')
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
      const { data } = await axios.post('/api/login', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      })
      this.token = data.access_token
      this.refreshToken = data.refresh_token
      localStorage.setItem('access_token', this.token)
      localStorage.setItem('refresh_token', this.refreshToken)
      
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
    logout() {
      this.token = ''
      this.refreshToken = ''
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  }
})
