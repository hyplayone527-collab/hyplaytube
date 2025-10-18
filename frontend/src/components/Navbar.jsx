import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, User, MessageCircle, Search, LogOut } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

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
          <h2>Red Social</h2>
        </Link>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <Home size={24} />
            <span>Inicio</span>
          </Link>
          
          <Link to={`/profile/${user?.username}`} className="nav-link">
            <User size={24} />
            <span>Perfil</span>
          </Link>
          
          <Link to="/chat" className="nav-link">
            <MessageCircle size={24} />
            <span>Chat</span>
          </Link>

          <div className="user-menu">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt={user?.fullName}
              className="user-avatar"
            />
            <div className="user-dropdown">
              <div className="user-info">
                <p className="user-name">{user?.fullName}</p>
                <p className="user-username">@{user?.username}</p>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar