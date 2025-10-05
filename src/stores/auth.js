import { defineStore } from 'pinia'
import api from '../services/api.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async login(email, password) {
      try {
        // Call your backend login
        const { data } = await api.post('/login', { email, password })
        this.token = data.token
        localStorage.setItem('token', this.token)
        return true
      } catch (e) {
        // Fallback demo mode: accept any non-empty credentials
        if (email && password) {
          this.token = 'demo-token'
          localStorage.setItem('token', this.token)
          return true
        }
        throw e
      }
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})