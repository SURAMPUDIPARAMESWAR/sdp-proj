import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword } from '../../utils/validators'
import PublicNavbar from '../common/PublicNavbar'
import './Signup.css'

export default function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institutionId: '',
    role: 'student'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const roles = [
    { value: 'student', label: '👨‍🎓 Student', description: 'Track your grades and progress' },
    { value: 'teacher', label: '👨‍🏫 Teacher', description: 'Manage your classes and students' },
    { value: 'parent', label: '👨‍👩‍👧 Parent', description: 'Monitor your child\'s performance' },
    { value: 'admin', label: '⚙️ Administrator', description: 'Manage the entire system' }
  ]

  const calculatePasswordStrength = (pwd) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[!@#$%^&*]/.test(pwd)) strength++
    return strength
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.institutionId.trim()) {
      newErrors.institutionId = 'Institution ID is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be 8+ characters with uppercase, number, and special character'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      login({
        name: formData.name,
        email: formData.email,
        role: formData.role
      })
      alert(`Welcome ${formData.name}! Account created successfully.`)
      const roleRoutes = {
        student: '/student',
        teacher: '/teacher',
        parent: '/parent',
        admin: '/admin'
      }
      navigate(roleRoutes[formData.role])
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: error.message || 'An error occurred during signup' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PublicNavbar />
      <div className="signup-container">
        {/* Left Side - Info Section */}
        <div className="signup-info-section">
          <div className="signup-info-content">
            <h2>Join Our Community</h2>
            <p>Empower your educational journey with real-time analytics and insights</p>

            <div className="signup-features">
              <div className="signup-feature">
                <span className="signup-feature-icon">📊</span>
                <div>
                  <h4>Real-Time Analytics</h4>
                  <p>Track performance with live data</p>
                </div>
              </div>
              <div className="signup-feature">
                <span className="signup-feature-icon">💬</span>
                <div>
                  <h4>Direct Communication</h4>
                  <p>Connect with students & parents</p>
                </div>
              </div>
              <div className="signup-feature">
                <span className="signup-feature-icon">📈</span>
                <div>
                  <h4>Progress Tracking</h4>
                  <p>Monitor growth over time</p>
                </div>
              </div>
              <div className="signup-feature">
                <span className="signup-feature-icon">🔒</span>
                <div>
                  <h4>Secure & Private</h4>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>

            <div className="signup-stats">
              <div className="stat">
                <strong>10,000+</strong>
                <span>Active Users</span>
              </div>
              <div className="stat">
                <strong>500+</strong>
                <span>Schools</span>
              </div>
              <div className="stat">
                <strong>99.9%</strong>
                <span>Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-form-section">
          <div className="signup-card">
            <div className="signup-header">
              <h1>📚 Create Account</h1>
              <p>Join Student Analytics System today</p>
            </div>

            {errors.submit && (
              <div className="alert alert-error">
                ❌ {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              {/* Institution ID */}
              <div className="form-group">
                <label htmlFor="institutionId">Institution ID *</label>
                <input
                  type="text"
                  id="institutionId"
                  name="institutionId"
                  value={formData.institutionId}
                  onChange={handleInputChange}
                  placeholder="e.g., STU001 or TEA001"
                  className={`form-input ${errors.institutionId ? 'error' : ''}`}
                />
                {errors.institutionId && <span className="form-error">{errors.institutionId}</span>}
              </div>

              {/* Role Selection */}
              <div className="form-group">
                <label>Select Your Role *</label>
                <div className="role-selector">
                  {roles.map(role => (
                    <label key={role.value} className={`role-option ${formData.role === role.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                      />
                      <span className="role-label">{role.label}</span>
                      <span className="role-description">{role.description}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>

                {formData.password && (
                  <div className={`password-strength ${
                    passwordStrength === 1 ? 'weak' : 
                    passwordStrength === 2 ? 'fair' : 
                    passwordStrength === 3 ? 'good' : 'strong'
                  }`}>
                    {passwordStrength === 1 ? 'Weak' : 
                     passwordStrength === 2 ? 'Fair' : 
                     passwordStrength === 3 ? 'Good' : 'Strong'}
                  </div>
                )}

                <ul className="password-requirements">
                  <li className={formData.password.length >= 8 ? 'met' : ''}>
                    ✓ At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'met' : ''}>
                    ✓ One uppercase & one lowercase
                  </li>
                  <li className={/\d/.test(formData.password) ? 'met' : ''}>
                    ✓ One number
                  </li>
                  <li className={/[!@#$%^&*]/.test(formData.password) ? 'met' : ''}>
                    ✓ One special character (!@#$%^&*)
                  </li>
                </ul>

                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter your password"
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>

              {/* Terms and Conditions */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#terms" className="terms-link">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="#privacy" className="terms-link">Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <span className="form-error">{errors.terms}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? '✓ Creating Account...' : '✓ Create Account'}
              </button>
            </form>

            {/* Footer */}
            <div className="signup-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="signup-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
