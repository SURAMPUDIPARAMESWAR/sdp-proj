import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'
import { validateEmail, validatePassword, validateForm } from '../../utils/validators'
import { authService } from '../../services/authService'
import PublicNavbar from '../common/PublicNavbar'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('student')
  const [roleError, setRoleError] = useState('')

  // numeric CAPTCHA state
  const [captchaCode, setCaptchaCode] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  // generate a 5-digit numeric captcha
  const generateCaptcha = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString()
    setCaptchaCode(code)
    setCaptchaInput('')
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  // Demo credentials mapped by role
  const demoCredentials = {
    student: { email: 'student@test.com', password: 'Student@123' },
    teacher: { email: 'teacher@test.com', password: 'Teacher@123' },
    parent: { email: 'parent@test.com', password: 'Parent@123' },
    admin: { email: 'admin@test.com', password: 'Admin@123' }
  }

  const roles = [
    { value: 'student', label: '👨‍🎓 Student - Track your grades' },
    { value: 'teacher', label: '👨‍🏫 Teacher - Manage students' },
    { value: 'parent', label: '👨‍👩‍👧 Parent - Monitor child' },
    { value: 'admin', label: '⚙️ Admin - Manage system' }
  ]

  const validate = (values) =>
    validateForm(values, {
      email: (val) => validateEmail(val),
      password: (val) => validatePassword(val)
    })

  const handleSubmit = async (values) => {
    setRoleError('')
    setCaptchaError('')

    // CAPTCHA check
    if (!captchaInput.trim()) {
      setCaptchaError('❌ Please enter the CAPTCHA code.')
      return
    }
    if (captchaInput.trim() !== captchaCode) {
      setCaptchaError('❌ CAPTCHA does not match. Please try again.')
      generateCaptcha()
      return
    }

    // Check if selected role credentials match
    const selectedCredentials = demoCredentials[selectedRole]

    if (values.email !== selectedCredentials.email) {
      setRoleError(
        `❌ This email is not associated with the ${selectedRole} role. Use ${selectedCredentials.email}`
      )
      return
    }

    if (values.password !== selectedCredentials.password) {
      setRoleError(`❌ Incorrect password for ${selectedRole} role.`)
      return
    }

    setLoading(true)
    try {
      const result = await authService.login(values.email, values.password)

      // Verify that the returned role matches selected role
      if (result.user.role !== selectedRole) {
        setRoleError(
          `❌ Role mismatch. Expected ${selectedRole} but got ${result.user.role}`
        )
        setLoading(false)
        return
      }

      login(result.user)
      setTimeout(() => {
        navigate(`/${result.user.role}`)
      }, 500)
    } catch (error) {
      setRoleError(
        `❌ Login failed: ${error.message || 'Invalid credentials'}`
      )
      setLoading(false)
    }
  }

  const form = useForm({ email: '', password: '' }, handleSubmit, validate)

  return (
    <>
      <PublicNavbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>🔓 Login to your account</h1>
          </div>

          {form.submitMessage.text && (
            <div className={`alert alert-${form.submitMessage.type}`}>
              {form.submitMessage.text}
            </div>
          )}

          {roleError && <div className="alert alert-error">{roleError}</div>}

          {captchaError && (
            <div className="alert alert-error">{captchaError}</div>
          )}

          <form onSubmit={form.handleSubmit}>
            {/* Role Selection Dropdown */}
            <div className="form-group">
              <label htmlFor="role">Select Your Role *</label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value)
                  setRoleError('')
                }}
                className="form-input form-select"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <div className="role-hint">
                💡 Selected role:{' '}
                <strong>
                  {selectedRole.charAt(0).toUpperCase() +
                    selectedRole.slice(1)}
                </strong>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={`form-input ${
                  form.touched.email && form.errors.email ? 'error' : ''
                }`}
                placeholder={`e.g., ${demoCredentials[selectedRole].email}`}
                disabled={form.isSubmitting || loading}
              />
              {form.touched.email && form.errors.email && (
                <span className="form-error">❌ {form.errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={`form-input ${
                  form.touched.password && form.errors.password ? 'error' : ''
                }`}
                placeholder="Enter your password"
                disabled={form.isSubmitting || loading}
              />
              {form.touched.password && form.errors.password && (
                <span className="form-error">❌ {form.errors.password}</span>
              )}
            </div>

            {/* Numeric CAPTCHA */}
            <div
              className="form-group"
              style={{
                marginTop: '0.75rem',
                padding: '10px 12px',
                borderRadius: '8px',
                background: '#f5f7fa',
                border: '1px solid #d0d5e0'
              }}
            >
              <label style={{ fontWeight: 'bold', display: 'block' }}>
                CAPTCHA Verification
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '6px',
                  marginBottom: '6px'
                }}
              >
                <div
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background:
                      'linear-gradient(90deg, #2979ff, #4f8bff)',
                    color: '#fff',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    fontSize: '1.1rem'
                  }}
                >
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#2979ff',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textDecoration: 'underline'
                  }}
                  disabled={form.isSubmitting || loading}
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter the code shown above"
                className="form-input"
                disabled={form.isSubmitting || loading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={form.isSubmitting || loading}
            >
              {form.isSubmitting || loading ? '🔄 Logging in...' : '🔓 Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
          </div>

          {/* Demo Credentials - Dynamic based on selected role */}
          <div className="demo-credentials">
            <h4>
              📝 Credentials for{' '}
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}:
            </h4>
            <div className="demo-table">
              <div className="demo-row">
                <strong>Email:</strong>
                <span>{demoCredentials[selectedRole].email}</span>
              </div>
              <div className="demo-row">
                <strong>Password:</strong>
                <span>{demoCredentials[selectedRole].password}</span>
              </div>
            </div>

            <h4 style={{ marginTop: '1.5rem' }}>📝 All Demo Credentials:</h4>
            <div className="demo-table">
              <div className="demo-row">
                <strong>Student:</strong>
                <span>student@test.com / Student@123</span>
              </div>
              <div className="demo-row">
                <strong>Teacher:</strong>
                <span>teacher@test.com / Teacher@123</span>
              </div>
              <div className="demo-row">
                <strong>Parent:</strong>
                <span>parent@test.com / Parent@123</span>
              </div>
              <div className="demo-row">
                <strong>Admin:</strong>
                <span>admin@test.com / Admin@123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
