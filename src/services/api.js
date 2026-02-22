import axios from 'axios'

const api = axios.create({
  baseURL: '/admin-api' // proxied to https://app.isb.orb.local/admin-api in vite.config.js
})

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api