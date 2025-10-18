import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Home, User, MessageCircle, Search, LogOut, Moon, Sun, Trophy, Settings } from 'lucide-react'
import { useState } from 'react'
import Notifications from './Notifications'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme, t, language, changeLanguage } = useTheme()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implementar búsqueda
      console.log('Buscar:', searchQuery)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>🎬 NovaStream</h2>
        </Link>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <Home size={24} />
            <span>{t('home')}</span>
          </Link>
          
          <Link to={`/profile/${user?.username}`} className="nav-link">
            <User size={24} />
            <span>{t('profile')}</span>
          </Link>
          
          <Link to="/chat" className="nav-link">
            <MessageCircle size={24} />
            <span>{t('chat')}</span>
          </Link>

          <Link to="/achievements" className="nav-link">
            <Trophy size={24} />
            <span>{t('achievements')}</span>
          </Link>

          <Notifications />

          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>

          <div className="user-menu">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt={user?.fullName}
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
            />
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <p className="user-name">{user?.fullName}</p>
                  <p className="user-username">@{user?.username}</p>
                </div>
                
                <div className="dropdown-section">
                  <h4>Idioma</h4>
                  <div className="language-options">
                    <button 
                      onClick={() => changeLanguage('es')}
                      className={language === 'es' ? 'active' : ''}
                    >
                      🇪🇸 Español
                    </button>
                    <button 
                      onClick={() => changeLanguage('en')}
                      className={language === 'en' ? 'active' : ''}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                </div>

                <Link to="/settings" className="dropdown-link">
                  <Settings size={16} />
                  {t('settings')}
                </Link>

                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={16} />
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar