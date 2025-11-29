import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Failed to parse stored user:', err)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    try {
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      setError(null)
      return userData
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setError(null)
  }

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
export default AuthContext