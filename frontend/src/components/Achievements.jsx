import { useState, useEffect } from 'react'
import { Trophy, Star, Award, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Achievements = () => {
  const { user } = useAuth()
  const { t } = useTheme()
  const [achievements, setAchievements] = useState([])
  const [availableAchievements, setAvailableAchievements] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [leaderboard, setLeaderboard] = useState([])
  const [activeTab, setActiveTab] = useState('earned')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchAchievements()
      fetchLeaderboard()
    }
  }, [user])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5001/api/achievements')
      setAchievements(response.data.achievements)
      setAvailableAchievements(response.data.availableAchievements)
      setTotalPoints(response.data.totalPoints)
    } catch (error) {
      console.error('Error al obtener logros:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/achievements/leaderboard')
      setLeaderboard(response.data)
    } catch (error) {
      console.error('Error al obtener leaderboard:', error)
    }
  }

  const checkAchievements = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/achievements/check')
      
      if (response.data.newAchievements.length > 0) {
        // Mostrar notificación de nuevos logros
        response.data.newAchievements.forEach(achievement => {
          showAchievementToast(achievement)
        })
        
        // Actualizar la lista de logros
        fetchAchievements()
      } else {
        toast('No hay nuevos logros por ahora', { icon: '🎯' })
      }
    } catch (error) {
      console.error('Error al verificar logros:', error)
      toast.error('Error al verificar logros')
    }
  }

  const showAchievementToast = (achievement) => {
    const toastContent = (
      <div className="achievement-toast-content">
        <div className="achievement-particles">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
        <div className="achievement-content">
          <div className="achievement-icon">{achievement.icon}</div>
          <div className="achievement-text">
            <h4>¡Logro Desbloqueado!</h4>
            <p>{achievement.name}</p>
            <small>+{achievement.points} puntos</small>
          </div>
        </div>
      </div>
    )

    toast.custom(toastContent, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '300px'
      }
    })
  }

  const getEarnedAchievements = () => {
    const earnedIds = achievements.map(a => a.achievementId)
    return availableAchievements.filter(a => earnedIds.includes(a.id))
  }

  const getLockedAchievements = () => {
    const earnedIds = achievements.map(a => a.achievementId)
    return availableAchievements.filter(a => !earnedIds.includes(a.id))
  }

  const getUserRank = () => {
    const userIndex = leaderboard.findIndex(u => u._id === user._id)
    return userIndex !== -1 ? userIndex + 1 : null
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  if (loading) {
    return (
      <div className="achievements-loading">
        <div className="loading-spinner"></div>
        <p>Cargando logros...</p>
      </div>
    )
  }

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <div className="achievements-stats">
          <div className="stat-card">
            <Trophy className="stat-icon" />
            <div className="stat-info">
              <h3>{achievements.length}</h3>
              <p>Logros Desbloqueados</p>
            </div>
          </div>
          
          <div className="stat-card">
            <Star className="stat-icon" />
            <div className="stat-info">
              <h3>{totalPoints}</h3>
              <p>Puntos Totales</p>
            </div>
          </div>
          
          <div className="stat-card">
            <Award className="stat-icon" />
            <div className="stat-info">
              <h3>{getUserRank() || '-'}</h3>
              <p>Posición Global</p>
            </div>
          </div>
        </div>

        <button 
          onClick={checkAchievements}
          className="check-achievements-btn"
        >
          <Target size={16} />
          Verificar Logros
        </button>
      </div>

      <div className="achievements-tabs">
        <button 
          className={`tab ${activeTab === 'earned' ? 'active' : ''}`}
          onClick={() => setActiveTab('earned')}
        >
          Desbloqueados ({getEarnedAchievements().length})
        </button>
        <button 
          className={`tab ${activeTab === 'locked' ? 'active' : ''}`}
          onClick={() => setActiveTab('locked')}
        >
          Bloqueados ({getLockedAchievements().length})
        </button>
        <button 
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Ranking
        </button>
      </div>

      <div className="achievements-content">
        {activeTab === 'earned' && (
          <div className="achievements-grid">
            {getEarnedAchievements().map(achievement => (
              <motion.div
                key={achievement.id}
                className="achievement-card earned"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="achievement-card-icon">{achievement.icon}</span>
                <h4 className="achievement-card-name">{achievement.name}</h4>
                <p className="achievement-card-description">{achievement.description}</p>
                <span className="achievement-card-points">+{achievement.points} pts</span>
              </motion.div>
            ))}
            
            {getEarnedAchievements().length === 0 && (
              <div className="achievements-empty">
                <Trophy size={48} />
                <p>Aún no has desbloqueado ningún logro</p>
                <button onClick={checkAchievements} className="check-achievements-btn">
                  Verificar Logros
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'locked' && (
          <div className="achievements-grid">
            {getLockedAchievements().map(achievement => (
              <motion.div
                key={achievement.id}
                className="achievement-card locked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="achievement-card-icon">{achievement.icon}</span>
                <h4 className="achievement-card-name">{achievement.name}</h4>
                <p className="achievement-card-description">{achievement.description}</p>
                <span className="achievement-card-points">+{achievement.points} pts</span>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user._id}
                className="leaderboard-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`leaderboard-rank ${
                  index === 0 ? 'first' : 
                  index === 1 ? 'second' : 
                  index === 2 ? 'third' : ''
                }`}>
                  {getRankIcon(index + 1)}
                </div>
                
                <img 
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.fullName}
                  className="leaderboard-avatar"
                />
                
                <div className="leaderboard-info">
                  <p className="leaderboard-name">{user.fullName}</p>
                  <p className="leaderboard-username">@{user.username}</p>
                </div>
                
                <div className="leaderboard-stats">
                  <p className="leaderboard-points">{user.points} pts</p>
                  <p className="leaderboard-achievements">{user.achievementsCount} logros</p>
                </div>
              </motion.div>
            ))}
            
            {leaderboard.length === 0 && (
              <div className="leaderboard-empty">
                <Award size={48} />
                <p>El ranking aún está vacío</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Achievements
