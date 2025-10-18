import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Datos de ejemplo para videos
  const mockVideos = [
    {
      id: 1,
      title: "Cómo crear una aplicación web moderna con React",
      channel: "DevTutorials",
      channelAvatar: "D",
      views: "234K",
      duration: "24:15",
      thumbnail: "https://via.placeholder.com/320x180/4ecdc4/ffffff?text=React+Tutorial",
      uploadTime: "hace 2 días"
    },
    {
      id: 2,
      title: "Los mejores trucos de CSS que debes conocer",
      channel: "DesignMaster",
      channelAvatar: "D",
      views: "156K",
      duration: "18:32",
      thumbnail: "https://via.placeholder.com/320x180/ff6b6b/ffffff?text=CSS+Tips",
      uploadTime: "hace 1 día"
    },
    {
      id: 3,
      title: "JavaScript ES2024: Nuevas características",
      channel: "JSExpert",
      channelAvatar: "J",
      views: "89K",
      duration: "15:47",
      thumbnail: "https://via.placeholder.com/320x180/45b7d1/ffffff?text=JavaScript",
      uploadTime: "hace 3 horas"
    },
    {
      id: 4,
      title: "Node.js y Express: API REST completa",
      channel: "BackendPro",
      channelAvatar: "B",
      views: "312K",
      duration: "45:23",
      thumbnail: "https://via.placeholder.com/320x180/96ceb4/ffffff?text=Node.js",
      uploadTime: "hace 1 semana"
    },
    {
      id: 5,
      title: "Diseño UI/UX: Principios fundamentales",
      channel: "UXDesigner",
      channelAvatar: "U",
      views: "198K",
      duration: "32:18",
      thumbnail: "https://via.placeholder.com/320x180/feca57/ffffff?text=UI%2FUX",
      uploadTime: "hace 4 días"
    },
    {
      id: 6,
      title: "MongoDB vs PostgreSQL: ¿Cuál elegir?",
      channel: "DatabaseGuru",
      channelAvatar: "D",
      views: "145K",
      duration: "28:09",
      thumbnail: "https://via.placeholder.com/320x180/ff9ff3/ffffff?text=Database",
      uploadTime: "hace 2 días"
    },
    {
      id: 7,
      title: "Docker para desarrolladores: Guía completa",
      channel: "DevOpsChannel",
      channelAvatar: "D",
      views: "267K",
      duration: "52:14",
      thumbnail: "https://via.placeholder.com/320x180/54a0ff/ffffff?text=Docker",
      uploadTime: "hace 5 días"
    },
    {
      id: 8,
      title: "React Native: App móvil desde cero",
      channel: "MobileDev",
      channelAvatar: "M",
      views: "178K",
      duration: "1:15:32",
      thumbnail: "https://via.placeholder.com/320x180/5f27cd/ffffff?text=React+Native",
      uploadTime: "hace 1 día"
    }
  ]

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setVideos(mockVideos)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando contenido...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container fade-in">
      <div className="home-header">
        <h1 className="welcome-title">
          ¡Hola, {user?.username}! 👋
        </h1>
        <p className="welcome-subtitle">
          Descubre contenido increíble en NovaStream
        </p>
      </div>

      <div className="quick-actions">
        <Link to="/trending" className="quick-action trending">
          <div className="action-icon">🔥</div>
          <div className="action-text">
            <h3>Tendencias</h3>
            <p>Lo más popular ahora</p>
          </div>
        </Link>

        <Link to="/subscriptions" className="quick-action subscriptions">
          <div className="action-icon">📺</div>
          <div className="action-text">
            <h3>Suscripciones</h3>
            <p>Tus canales favoritos</p>
          </div>
        </Link>

        <Link to="/library" className="quick-action library">
          <div className="action-icon">📚</div>
          <div className="action-text">
            <h3>Biblioteca</h3>
            <p>Tu contenido guardado</p>
          </div>
        </Link>
      </div>

      <div className="section-header">
        <h2 className="section-title">Recomendado para ti</h2>
        <p className="section-subtitle">Videos seleccionados basados en tus intereses</p>
      </div>

      <div className="videos-grid">
        {videos.map((video, index) => (
          <Link 
            key={video.id} 
            to={`/watch/${video.id}`}
            className="video-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <div className="video-meta">
                <div className="channel-avatar">
                  {video.channelAvatar}
                </div>
                <div className="video-details">
                  <div className="channel-name">{video.channel}</div>
                  <div className="video-stats">
                    {video.views} visualizaciones • {video.uploadTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .home-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px 0;
          background: var(--accent-gradient);
          border-radius: var(--border-radius-lg);
          color: white;
        }

        .welcome-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .welcome-subtitle {
          font-size: 18px;
          opacity: 0.9;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-lg);
          text-decoration: none;
          color: var(--text-primary);
          transition: var(--transition);
          border: 1px solid transparent;
        }

        .quick-action:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-color);
        }

        .quick-action.trending:hover {
          border-color: var(--accent-primary);
        }

        .quick-action.subscriptions:hover {
          border-color: var(--accent-secondary);
        }

        .quick-action.library:hover {
          border-color: #45b7d1;
        }

        .action-icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-tertiary);
          border-radius: var(--border-radius);
        }

        .action-text h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .action-text p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .section-header {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .section-subtitle {
          color: var(--text-secondary);
          font-size: 16px;
        }

        .video-card {
          text-decoration: none;
          color: inherit;
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        @media (max-width: 768px) {
          .home-header {
            padding: 24px 16px;
          }

          .welcome-title {
            font-size: 24px;
          }

          .welcome-subtitle {
            font-size: 16px;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default Home