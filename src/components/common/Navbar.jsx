import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  // Don't show navbar on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
      setShowMenu(false)
    }
  }

  const isPublicPage = !user
  const isDashboardPage = user

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setShowMenu(false)}>
          📊 Analytics System
        </Link>

        {/* Menu Toggle Button */}
        <button
          className="menu-toggle"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${showMenu ? 'active' : ''}`}>
          {/* Public Navigation */}
          {isPublicPage && (
            <div className="nav-links">
              <Link to="/" className="nav-link" onClick={() => setShowMenu(false)}>
                🏠 Home
              </Link>
              <Link to="/signup" className="nav-link" onClick={() => setShowMenu(false)}>
                ✍️ Sign Up
              </Link>
              <Link to="/login" className="nav-link btn-signin" onClick={() => setShowMenu(false)}>
                🔑 Sign In
              </Link>
            </div>
          )}

          {/* Dashboard Navigation */}
          {isDashboardPage && (
            <div className="nav-links-dashboard">
              <Link to="/" className="nav-link" onClick={() => setShowMenu(false)}>
                🏠 Home
              </Link>

              {/* User Info */}
              <div className="navbar-user">
                <span className="user-icon">👤</span>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                className="btn-logout"
                onClick={handleLogout}
                title="Click to logout"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
