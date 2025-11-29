import api from './api'

const MOCK_USERS = {
  'student@test.com': { 
    password: 'Student@123', 
    role: 'student', 
    id: 'STU001', 
    name: 'John Smith',
    email: 'student@test.com'
  },
  'teacher@test.com': { 
    password: 'Teacher@123', 
    role: 'teacher', 
    id: 'TEA001', 
    name: 'Ms. Sharma',
    email: 'teacher@test.com'
  },
  'parent@test.com': { 
    password: 'Parent@123', 
    role: 'parent', 
    id: 'PAR001', 
    name: 'Mr. Smith',
    email: 'parent@test.com'
  },
  'admin@test.com': { 
    password: 'Admin@123', 
    role: 'admin', 
    id: 'ADM001', 
    name: 'Admin User',
    email: 'admin@test.com'
  }
}

export const authService = {
  register: async (userData) => {
    try {
      if (Object.keys(MOCK_USERS).includes(userData.email)) {
        throw new Error('User with this email already exists')
      }

      const newUser = {
        ...userData,
        id: `${userData.role.toUpperCase()}${Date.now()}`,
      }

      MOCK_USERS[userData.email] = newUser

      return {
        success: true,
        message: 'Registration successful. Please login.',
        user: { 
          email: userData.email, 
          role: userData.role,
          name: userData.name
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  login: async (email, password) => {
    try {
      const user = MOCK_USERS[email]
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password')
      }

      const token = 'mock-jwt-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email,
        name: user.name,
        role: user.role
      }))

      return {
        success: true,
        user: { 
          id: user.id, 
          email, 
          name: user.name, 
          role: user.role 
        },
        token
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  verifyToken: async (token) => {
    try {
      // Simulate token verification
      if (!token || !token.startsWith('mock-jwt-token-')) {
        throw new Error('Invalid token')
      }
      return { valid: true }
    } catch (error) {
      throw error
    }
  }
}
export default authService