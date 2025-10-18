import React, { useState, useEffect } from 'react'

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [loading, setLoading] = useState(true)

  // Datos de ejemplo para videos trending
  const mockTrendingVideos = [
    {
      id: 1,
      title: "Los mejores momentos de gaming 2024",
      channel: "GameMaster",
      views: "2.5M",
      duration: "15:32",
      thumbnail: "https://via.placeholder.com/320x180/ff6b6b/ffffff?text=Gaming",
      uploadTime: "hace 2 días"
    },
    {
      id: 2,
      title: "Tutorial: Cómo crear contenido viral",
      channel: "CreatorPro",
      views: "1.8M",
      duration: "12:45",
      thumbnail: "https://via.placeholder.com/320x180/4ecdc4/ffffff?text=Tutorial",
      uploadTime: "hace 1 día"
    },
    {
      id: 3,
      title: "Reacción épica a trailer de película",
      channel: "MovieReacts",
      views: "3.2M",
      duration: "8:21",
      thumbnail: "https://via.placeholder.com/320x180/45b7d1/ffffff?text=Reaction",
      uploadTime: "hace 3 horas"
    },
    {
      id: 4,
      title: "Música lo-fi para estudiar y relajarse",
      channel: "ChillBeats",
      views: "5.1M",
      duration: "1:30:00",
      thumbnail: "https://via.placeholder.com/320x180/96ceb4/ffffff?text=Music",
      uploadTime: "hace 1 semana"
    },
    {
      id: 5,
      title: "Experimento científico increíble",
      channel: "ScienceFun",
      views: "4.3M",
      duration: "10:15",
      thumbnail: "https://via.placeholder.com/320x180/feca57/ffffff?text=Science",
      uploadTime: "hace 4 días"
    },
    {
      id: 6,
      title: "Receta de cocina en 5 minutos",
      channel: "QuickCook",
      views: "2.1M",
      duration: "5:33",
      thumbnail: "https://via.placeholder.com/320x180/ff9ff3/ffffff?text=Cooking",
      uploadTime: "hace 6 horas"
    }
  ]

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setTrendingVideos(mockTrendingVideos)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando tendencias...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container fade-in">
      <div className="trending-header">
        <h1 className="page-title">
          🔥 Tendencias
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Los videos más populares en NovaStream ahora mismo
        </p>
      </div>

      <div className="trending-filters">
        <button className="filter-btn active">Todos</button>
        <button className="filter-btn">Gaming</button>
        <button className="filter-btn">Música</button>
        <button className="filter-btn">Educación</button>
        <button className="filter-btn">Entretenimiento</button>
        <button className="filter-btn">Tecnología</button>
      </div>

      <div className="videos-grid">
        {trendingVideos.map((video, index) => (
          <div key={video.id} className="video-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <span className="video-duration">{video.duration}</span>
              <div className="trending-badge">#{index + 1}</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <div className="video-meta">
                <div className="channel-avatar">
                  {video.channel.charAt(0)}
                </div>
                <div className="video-details">
                  <div className="channel-name">{video.channel}</div>
                  <div className="video-stats">
                    {video.views} visualizaciones • {video.uploadTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trending-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .trending-filters {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .filter-btn {
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          font-size: 14px;
          font-weight: 500;
        }

        .filter-btn:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background-color: var(--accent-secondary);
          color: white;
        }

        .trending-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: var(--accent-gradient);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
        }

        .video-card {
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
      `}</style>
    </div>
  )
}

export default Trending