import axios from 'axios'

const api = axios.create({
  baseURL: '/api' // proxied to http://localhost:8080 in vite.config.js
})

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api