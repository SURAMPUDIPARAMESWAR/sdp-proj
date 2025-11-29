import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="home-navbar">
        <div className="home-navbar-container">
          <Link to="/" className="home-logo">
            📊 Student Analytics System
          </Link>
          <div className="home-nav-links">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Empower Education with Data-Driven Insights</h1>
            <p>
              A comprehensive platform for students, teachers, parents, and administrators to track academic progress in real-time.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary btn-lg">
                Login Now
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                Create Account
              </Link>
            </div>
          </div>
          <div className="hero-illustration">
            📈📊👨‍🎓👩‍🏫👨‍👩‍👧‍👦
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍🎓</div>
              <h3>For Students</h3>
              <p>
                View academic results & grades, track progress by subject, receive teacher suggestions, communicate with teachers
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👩‍🏫</div>
              <h3>For Teachers</h3>
              <p>
                Manage student records, update marks & attendance, send suggestions to students, message parents
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>For Parents</h3>
              <p>
                Monitor child's progress, view complete reports, receive teacher updates, track attendance
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3>For Administrators</h3>
              <p>
                Manage all users, admit new students, view analytics & reports, send system messages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits" id="benefits">
        <div className="benefits-container">
          <h2>Why Choose Us?</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">✅</div>
              <div>
                <h3>Real-Time Updates</h3>
                <p>Get instant notifications about academic performance and important announcements.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">✅</div>
              <div>
                <h3>Data Security</h3>
                <p>Your information is protected with industry-standard security measures.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">✅</div>
              <div>
                <h3>Easy to Use</h3>
                <p>Intuitive interface designed for all age groups and technical levels.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">✅</div>
              <div>
                <h3>Comprehensive Analytics</h3>
                <p>Detailed insights into student performance and institutional statistics.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">✅</div>
              <div>
                <h3>Multi-Role Support</h3>
                <p>Customized dashboards for students, teachers, parents, and admins.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">✅</div>
              <div>
                <h3>24/7 Access</h3>
                <p>Access your account anytime, anywhere from any device.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section className="demo-credentials">
        <div className="demo-container">
          <h2>Try Demo Accounts</h2>
          <p>Test all features with these demo credentials:</p>
          <div className="credentials-table">
            <div className="table-row">
              <div className="table-cell"><strong>📚 Student</strong></div>
              <div className="table-cell">student@test.com</div>
              <div className="table-cell">Student@123</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>👨‍🏫 Teacher</strong></div>
              <div className="table-cell">teacher@test.com</div>
              <div className="table-cell">Teacher@123</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>👨‍👩‍👧 Parent</strong></div>
              <div className="table-cell">parent@test.com</div>
              <div className="table-cell">Parent@123</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>⚙️ Admin</strong></div>
              <div className="table-cell">admin@test.com</div>
              <div className="table-cell">Admin@123</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ready to Transform Education?</h2>
          <p>Join thousands of users already using Student Analytics System</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Free Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <h4>About</h4>
          <p>Student Analytics System - Empowering education through data-driven insights.</p>

          <h4 style={{ marginTop: '1.5rem' }}>Quick Links</h4>
          <div className="footer-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
          </div>

          <h4 style={{ marginTop: '1.5rem' }}>Contact</h4>
          <p>Email: info@studentsanalytics.com</p>
          <p>Phone: +1 (800) 123-4567</p>

          <h4 style={{ marginTop: '1.5rem' }}>Follow Us</h4>
          <div className="footer-links">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
          </div>

          <p style={{ marginTop: '1.5rem', borderTop: '1px solid #555', paddingTop: '1rem' }}>
            © 2025 Student Analytics System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
