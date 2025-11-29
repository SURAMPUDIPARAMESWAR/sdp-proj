import axios from 'axios'

// API configuration
const API_BASE_URL = 'http://localhost:5000/api' // Change this if needed

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    const errorStatus = error.response?.status

    // Handle specific status codes
    if (errorStatus === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject({
      message: errorMessage,
      status: errorStatus,
      data: error.response?.data
    })
  }
)

export default api
