import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ collapsed }) => {
  const location = useLocation()

  const menuItems = [
    {
      section: 'Principal',
      items: [
        {
          path: '/',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          ),
          text: 'Inicio',
        },
        {
          path: '/trending',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
          ),
          text: 'Tendencias',
        },
        {
          path: '/subscriptions',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/>
            </svg>
          ),
          text: 'Suscripciones',
        },
      ],
    },
    {
      section: 'Biblioteca',
      items: [
        {
          path: '/library',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
            </svg>
          ),
          text: 'Biblioteca',
        },
        {
          path: '/history',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
          ),
          text: 'Historial',
        },
        {
          path: '/liked',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ),
          text: 'Videos que me gustan',
        },
      ],
    },
    {
      section: 'Social',
      items: [
        {
          path: '/chat',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          ),
          text: 'Chat',
        },
        {
          path: '/achievements',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ),
          text: 'Logros',
        },
        {
          path: '/profile',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ),
          text: 'Mi Canal',
        },
      ],
    },
  ]

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {menuItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className="sidebar-section">
          {!collapsed && (
            <div className="sidebar-title">{section.section}</div>
          )}
          {section.items.map((item, itemIndex) => (
            <Link
              key={itemIndex}
              to={item.path}
              className={`sidebar-item ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <div className="sidebar-icon">{item.icon}</div>
              <span className="sidebar-text">{item.text}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}

export default Sidebar