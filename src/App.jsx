import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import StudentDashboard from './components/dashboards/StudentDashboard'
import TeacherDashboard from './components/dashboards/TeacherDashboard'
import ParentDashboard from './components/dashboards/ParentDashboard'
import AdminDashboard from './components/dashboards/AdminDashboard'
import PaymentsPage from './pages/PaymentsPage'
import ChatSupportPage from './pages/ChatSupportPage'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes - No Navbar/Sidebar */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Student Dashboard - With Navbar & Sidebar */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <div className="app-layout">
                  <Navbar />
                  <div className="app-container">
                    
                    <StudentDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Teacher Dashboard - With Navbar & Sidebar */}
          <Route
            path="/teacher/*"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <div className="app-layout">
                  <Navbar />
                  <div className="app-container">
                    
                    <TeacherDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Parent Dashboard - Navbar Only (No Sidebar) */}
          <Route
            path="/parent/*"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <div className="app-layout">
                  <Navbar />
                  <div className="app-container full-width">
                    <ParentDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard - Navbar Only (No Sidebar) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="app-layout">
                  <Navbar />
                  <div className="app-container full-width">
                    <AdminDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
          {/* NEW advanced‑style features */}
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/chat-support" element={<ChatSupportPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
