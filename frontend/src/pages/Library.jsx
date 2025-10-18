import React, { useState } from 'react'

const Library = () => {
  const [activeTab, setActiveTab] = useState('recent')

  const libraryTabs = [
    { id: 'recent', label: 'Recientes', icon: '🕒' },
    { id: 'liked', label: 'Me gusta', icon: '❤️' },
    { id: 'watchLater', label: 'Ver más tarde', icon: '⏰' },
    { id: 'playlists', label: 'Listas de reproducción', icon: '📋' },
    { id: 'downloads', label: 'Descargas', icon: '⬇️' }
  ]

  const mockLibraryData = {
    recent: [
      {
        id: 1,
        title: "Último video que viste",
        channel: "TechChannel",
        thumbnail: "https://via.placeholder.com/160x90/6c5ce7/ffffff?text=Recent",
        progress: 65
      }
    ],
    liked: [
      {
        id: 2,
        title: "Video que te gustó",
        channel: "MusicChannel",
        thumbnail: "https://via.placeholder.com/160x90/ff6b6b/ffffff?text=Liked"
      }
    ],
    watchLater: [],
    playlists: [
      {
        id: 1,
        name: "Mis favoritos",
        videoCount: 12,
        thumbnail: "https://via.placeholder.com/160x90/4ecdc4/ffffff?text=Playlist"
      }
    ],
    downloads: []
  }

  const renderContent = () => {
    const data = mockLibraryData[activeTab]
    
    if (!data || data.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">
            {libraryTabs.find(tab => tab.id === activeTab)?.icon}
          </div>
          <h3>No hay contenido aquí</h3>
          <p>
            {activeTab === 'recent' && 'Tu historial de visualización aparecerá aquí'}
            {activeTab === 'liked' && 'Los videos que te gusten aparecerán aquí'}
            {activeTab === 'watchLater' && 'Guarda videos para ver más tarde'}
            {activeTab === 'playlists' && 'Crea listas de reproducción personalizadas'}
            {activeTab === 'downloads' && 'Descarga videos para verlos sin conexión'}
          </p>
        </div>
      )
    }

    if (activeTab === 'playlists') {
      return (
        <div className="playlists-grid">
          {data.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              <div className="playlist-thumbnail">
                <img src={playlist.thumbnail} alt={playlist.name} />
                <div className="playlist-count">{playlist.videoCount} videos</div>
              </div>
              <h3 className="playlist-name">{playlist.name}</h3>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="library-list">
        {data.map(item => (
          <div key={item.id} className="library-item">
            <div className="item-thumbnail">
              <img src={item.thumbnail} alt={item.title} />
              {item.progress && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="item-info">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-channel">{item.channel}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Biblioteca</h1>
      
      <div className="library-tabs">
        {libraryTabs.map(tab => (
          <button
            key={tab.id}
            className={`library-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="library-content">
        {renderContent()}
      </div>

      <style jsx>{`
        .library-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .library-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          border: none;
          padding: 12px 20px;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          font-size: 14px;
          font-weight: 500;
        }

        .library-tab:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .library-tab.active {
          background-color: var(--accent-secondary);
          color: white;
        }

        .tab-icon {
          font-size: 16px;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-secondary);
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          color: var(--text-primary);
          margin-bottom: 12px;
          font-size: 20px;
        }

        .library-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .library-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius);
          transition: var(--transition);
          cursor: pointer;
        }

        .library-item:hover {
          background-color: var(--bg-tertiary);
        }

        .item-thumbnail {
          position: relative;
          width: 160px;
          height: 90px;
          border-radius: var(--border-radius);
          overflow: hidden;
          flex-shrink: 0;
        }

        .item-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .progress-fill {
          height: 100%;
          background-color: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .item-info {
          flex: 1;
        }

        .item-title {
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .item-channel {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .playlist-card {
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
        }

        .playlist-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .playlist-thumbnail {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
        }

        .playlist-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .playlist-count {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .playlist-name {
          padding: 16px;
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default Library