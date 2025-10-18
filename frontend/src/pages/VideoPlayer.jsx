import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const VideoPlayer = () => {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  // Datos de ejemplo del video
  const mockVideo = {
    id: videoId,
    title: "Tutorial completo de React y Node.js - Construye una app completa",
    description: "En este tutorial aprenderás a crear una aplicación completa usando React en el frontend y Node.js en el backend. Cubriremos autenticación, base de datos, y despliegue.",
    channel: {
      name: "DevMaster",
      subscribers: "125K",
      avatar: "D"
    },
    views: "45,231",
    likes: "2,341",
    uploadDate: "hace 3 días",
    duration: "1:45:32",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Video de ejemplo
  }

  const relatedVideos = [
    {
      id: 1,
      title: "JavaScript ES6+ Features",
      channel: "CodeAcademy",
      views: "89K",
      duration: "22:15",
      thumbnail: "https://via.placeholder.com/200x112/4ecdc4/ffffff?text=JS"
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      channel: "DesignPro",
      views: "156K",
      duration: "18:30",
      thumbnail: "https://via.placeholder.com/200x112/ff6b6b/ffffff?text=CSS"
    },
    {
      id: 3,
      title: "MongoDB Crash Course",
      channel: "DatabaseGuru",
      views: "73K",
      duration: "35:45",
      thumbnail: "https://via.placeholder.com/200x112/45b7d1/ffffff?text=DB"
    }
  ]

  useEffect(() => {
    // Simular carga del video
    setTimeout(() => {
      setVideo(mockVideo)
      setLoading(false)
    }, 1000)
  }, [videoId])

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleSubscribe = () => {
    setSubscribed(!subscribed)
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando video...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="video-player-page fade-in">
      <div className="video-container">
        <div className="video-player">
          <iframe
            width="100%"
            height="100%"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-info">
          <h1 className="video-title">{video.title}</h1>
          
          <div className="video-meta">
            <div className="video-stats">
              {video.views} visualizaciones • {video.uploadDate}
            </div>
            
            <div className="video-actions">
              <button 
                className={`action-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                </svg>
                {liked ? parseInt(video.likes) + 1 : video.likes}
              </button>

              <button className="action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </button>

              <button className="action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
                Compartir
              </button>

              <button className="action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/>
                </svg>
                Guardar
              </button>
            </div>
          </div>

          <div className="channel-info">
            <div className="channel-details">
              <div className="channel-avatar">
                {video.channel.avatar}
              </div>
              <div className="channel-text">
                <h3 className="channel-name">{video.channel.name}</h3>
                <p className="channel-subs">{video.channel.subscribers} suscriptores</p>
              </div>
            </div>
            
            <button 
              className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
              onClick={handleSubscribe}
            >
              {subscribed ? 'Suscrito' : 'Suscribirse'}
            </button>
          </div>

          <div className="video-description">
            <p>{video.description}</p>
          </div>
        </div>
      </div>

      <div className="related-videos">
        <h3 className="related-title">Videos relacionados</h3>
        <div className="related-list">
          {relatedVideos.map(relatedVideo => (
            <div key={relatedVideo.id} className="related-video">
              <div className="related-thumbnail">
                <img src={relatedVideo.thumbnail} alt={relatedVideo.title} />
                <span className="related-duration">{relatedVideo.duration}</span>
              </div>
              <div className="related-info">
                <h4 className="related-video-title">{relatedVideo.title}</h4>
                <p className="related-channel">{relatedVideo.channel}</p>
                <p className="related-views">{relatedVideo.views} visualizaciones</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .video-player-page {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .video-container {
          min-width: 0;
        }

        .video-player {
          width: 100%;
          aspect-ratio: 16/9;
          background-color: #000;
          border-radius: var(--border-radius);
          overflow: hidden;
          margin-bottom: 16px;
        }

        .video-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .video-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .video-stats {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .video-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition);
          font-size: 14px;
          font-weight: 500;
        }

        .action-btn:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .action-btn.liked {
          background-color: var(--accent-primary);
          color: white;
        }

        .channel-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .channel-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .channel-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
        }

        .channel-name {
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .channel-subs {
          color: var(--text-secondary);
          font-size: 12px;
        }

        .subscribe-btn {
          background-color: var(--accent-primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
        }

        .subscribe-btn:hover {
          background-color: #ff5252;
        }

        .subscribe-btn.subscribed {
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .video-description {
          background-color: var(--bg-secondary);
          padding: 16px;
          border-radius: var(--border-radius);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .related-videos {
          min-width: 0;
        }

        .related-title {
          color: var(--text-primary);
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .related-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .related-video {
          display: flex;
          gap: 12px;
          cursor: pointer;
          transition: var(--transition);
          padding: 8px;
          border-radius: var(--border-radius);
        }

        .related-video:hover {
          background-color: var(--bg-secondary);
        }

        .related-thumbnail {
          position: relative;
          width: 160px;
          height: 90px;
          border-radius: var(--border-radius);
          overflow: hidden;
          flex-shrink: 0;
        }

        .related-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .related-duration {
          position: absolute;
          bottom      right: 4px;
         round-color: rgba(0, 0, 0, 0.8);
          color: white;
       ing: 2px 4px;
          border-radius: 2px;
          font-size: 10px;
          font-weight: 600;
        }

        .related-info {
          flex: 1;
          min-width: 0;
        }

        .related-video-title {
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .related-channel {
          color: var(--text-secondary);
          font-size: 12px;
          margin-bottom: 2px;
        }

        .related-views {
          color: var(--text-muted
          font-size: 12px;
        }

        @media (mawidth: 1024px) {
          .video-age {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .related-videos {
            order: -1;
          }

          .related-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap:       }
        }

        @media (max-width: 768px) {
          .video-meta {
            flex-direction: column;
            align-items: flt;
            gap: 12px;
          }

          .video-actions {
            width: 100%;
            justify-content: space-between;
          }

          .action-btn {
            flex: 1;
            justify-content: center;
          }

          .channel-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .related-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default VideoPlayer