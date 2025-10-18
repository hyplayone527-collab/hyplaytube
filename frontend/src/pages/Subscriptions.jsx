import React, { useState, useEffect } from 'react'

const Subscriptions = () => {
  const [subscriptionVideos, setSubscriptionVideos] = useState([])
  const [loading, setLoading] = useState(true)

  // Datos de ejemplo para suscripciones
  const mockSubscriptionVideos = [
    {
      id: 1,
      title: "Nuevo video de mi canal favorito",
      channel: "TechReviewer",
      views: "125K",
      duration: "18:45",
      thumbnail: "https://via.placeholder.com/320x180/6c5ce7/ffffff?text=Tech",
      uploadTime: "hace 30 minutos",
      isNew: true
    },
    {
      id: 2,
      title: "Stream en vivo: Jugando el nuevo juego",
      channel: "StreamerPro",
      views: "2.3K",
      duration: "LIVE",
      thumbnail: "https://via.placeholder.com/320x180/ff6b6b/ffffff?text=LIVE",
      uploadTime: "En vivo",
      isLive: true
    },
    {
      id: 3,
      title: "Tutorial avanzado de programación",
      channel: "CodeMaster",
      views: "89K",
      duration: "25:12",
      thumbnail: "https://via.placeholder.com/320x180/4ecdc4/ffffff?text=Code",
      uploadTime: "hace 2 horas"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setSubscriptionVideos(mockSubscriptionVideos)
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando suscripciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Suscripciones</h1>
      
      {subscriptionVideos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--text-muted)">
              <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/>
            </svg>
          </div>
          <h3>No tienes suscripciones aún</h3>
          <p>Suscríbete a canales para ver sus últimos videos aquí</p>
        </div>
      ) : (
        <div className="videos-grid">
          {subscriptionVideos.map((video, index) => (
            <div key={video.id} className="video-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                {video.isLive ? (
                  <span className="live-badge">EN VIVO</span>
                ) : (
                  <span className="video-duration">{video.duration}</span>
                )}
                {video.isNew && <div className="new-badge">NUEVO</div>}
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
      )}

      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-secondary);
        }

        .empty-icon {
          margin-bottom: 24px;
        }

        .empty-state h3 {
          color: var(--text-primary);
          margin-bottom: 12px;
          font-size: 20px;
        }

        .live-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background-color: #ff0000;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          animation: pulse 2s infinite;
        }

        .new-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background-color: var(--accent-primary);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default Subscriptions