import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ role }) {
  const location = useLocation()

  const menuItems = {
    student: [
      { label: 'Dashboard', path: '/student' },
      { label: 'Results', path: '/student/results' },
      { label: 'Progress', path: '/student/progress' },
      { label: 'Messages', path: '/student/messages' }
    ],
    teacher: [
      { label: 'Dashboard', path: '/teacher' },
      { label: 'Students', path: '/teacher/students' },
      { label: 'Marks', path: '/teacher/marks' },
      { label: 'Messages', path: '/teacher/messages' }
    ],
    parent: [
      { label: 'Dashboard', path: '/parent' },
      { label: 'Child Report', path: '/parent/report' },
      { label: 'Messages', path: '/parent/messages' }
    ],
    admin: [
      { label: 'Overview', path: '/admin' },
      { label: 'Students', path: '/admin/students' },
      { label: 'Teachers', path: '/admin/teachers' },
      { label: 'Parents', path: '/admin/parents' },
      { label: 'Analytics', path: '/admin/analytics' },
      { label: 'Messaging', path: '/admin/messaging' }
    ]
  }

  const items = menuItems[role] || []

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
