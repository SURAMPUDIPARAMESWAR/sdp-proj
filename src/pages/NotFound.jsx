import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/login" className="btn-primary">
          Go Back to Login
        </Link>
      </div>
    </div>
  )
}

export default NotFound
