import React from 'react'
import { Link } from 'react-router-dom'
import './PublicNavbar.css'

function PublicNavbar() {
  return (
    <nav className="public-navbar">
      <div className="public-navbar-container">
        <Link to="/" className="public-logo">
          📊 Student Analytics System
        </Link>
        <div className="public-nav-links">
          <Link to="/" className="public-nav-link">Home</Link>
          <Link to="/login" className="public-nav-link">Sign In</Link>
          <Link to="/register" className="public-nav-link public-nav-link-btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default PublicNavbar
