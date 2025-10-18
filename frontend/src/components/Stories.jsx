import { useState, useEffect } from 'react'
import { Plus, Eye, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'

const Stories = () => {
  const { user } = useAuth()
  const { t } = useTheme()
  const [stories, setStories] = useState([])
  const [showCreateStory, setShowCreateStory] = useState(false)
  const [viewingStory, setViewingStory] = useState(null)
  const [storyIndex, setStoryIndex] = useState(0)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stories')
      setStories(response.data)
    } catch (error) {
      console.error('Error al cargar historias:', error)
    }
  }

  const createStory = async (storyData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/stories', storyData)
      setStories(prev => [response.data, ...prev])
      setShowCreateStory(false)
    } catch (error) {
      console.error('Error al crear historia:', error)
    }
  }

  const viewStory = async (storyGroup, index = 0) => {
    setViewingStory(storyGroup)
    setStoryIndex(index)
    
    // Marcar como vista
    try {
      await axios.post(`http://localhost:5000/api/stories/${storyGroup.stories[index]._id}/view`)
    } catch (error) {
      console.error('Error al marcar historia como vista:', error)
    }
  }

  const nextStory = () => {
    if (viewingStory && storyIndex < viewingStory.stories.length - 1) {
      const newIndex = storyIndex + 1
      setStoryIndex(newIndex)
      viewStory(viewingStory, newIndex)
    } else {
      setViewingStory(null)
      setStoryIndex(0)
    }
  }

  const prevStory = () => {
    if (storyIndex > 0) {
      const newIndex = storyIndex - 1
      setStoryIndex(newIndex)
      viewStory(viewingStory, newIndex)
    }
  }

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {/* Crear nueva historia */}
        <div 
          className="story-item create-story"
          onClick={() => setShowCreateStory(true)}
        >
          <div className="story-avatar">
            <img src={user?.avatar || '/default-avatar.png'} alt="Tu historia" />
            <div className="add-story-icon">
              <Plus size={16} />
            </div>
          </div>
          <span className="story-username">Tu historia</span>
        </div>

        {/* Historias existentes */}
        {stories.map((storyGroup, index) => (
          <div 
            key={index}
            className={`story-item ${storyGroup.hasUnviewed ? 'unviewed' : 'viewed'}`}
            onClick={() => viewStory(storyGroup)}
          >
            <div className="story-avatar">
              <img 
                src={storyGroup.stories[0]?.author?.avatar || '/default-avatar.png'} 
                alt={storyGroup.stories[0]?.author?.fullName}
              />
            </div>
            <span className="story-username">
              {storyGroup.stories[0]?.author?.username}
            </span>
          </div>
        ))}
      </div>

      {/* Modal para crear historia */}
      <AnimatePresence>
        {showCreateStory && (
          <CreateStoryModal 
            onClose={() => setShowCreateStory(false)}
            onCreateStory={createStory}
          />
        )}
      </AnimatePresence>

      {/* Visor de historias */}
      <AnimatePresence>
        {viewingStory && (
          <StoryViewer
            storyGroup={viewingStory}
            currentIndex={storyIndex}
            onNext={nextStory}
            onPrev={prevStory}
            onClose={() => setViewingStory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const CreateStoryModal = ({ onClose, onCreateStory }) => {
  const [content, setContent] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [media, setMedia] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() || media) {
      onCreateStory({
        content: content.trim(),
        media,
        backgroundColor,
        type: media ? 'image' : 'text'
      })
    }
  }

  const colors = [
    '#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
  ]

  return (
    <motion.div 
      className="story-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="story-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor }}
      >
        <div className="story-modal-header">
          <h3>Crear Historia</h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="story-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe algo..."
            className="story-textarea"
            maxLength={200}
          />

          <div className="story-options">
            <div className="color-picker">
              <label>Color de fondo:</label>
              <div className="color-grid">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${backgroundColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="media-input">
              <label>URL de imagen (opcional):</label>
              <input
                type="url"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="create-story-btn"
            disabled={!content.trim() && !media}
          >
            Crear Historia
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

const StoryViewer = ({ storyGroup, currentIndex, onNext, onPrev, onClose }) => {
  const currentStory = storyGroup.stories[currentIndex]
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onNext()
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currentIndex, onNext])

  return (
    <motion.div 
      className="story-viewer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="story-viewer">
        {/* Barra de progreso */}
        <div className="story-progress-container">
          {storyGroup.stories.map((_, index) => (
            <div key={index} className="story-progress-bar">
              <div 
                className="story-progress-fill"
                style={{ 
                  width: index < currentIndex ? '100%' : 
                         index === currentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="story-header">
          <div className="story-author">
            <img 
              src={currentStory.author?.avatar || '/default-avatar.png'} 
              alt={currentStory.author?.fullName}
            />
            <div>
              <p className="author-name">{currentStory.author?.fullName}</p>
              <p className="story-time">
                {new Date(currentStory.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-story-btn">
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div 
          className="story-content"
          style={{ backgroundColor: currentStory.backgroundColor }}
          onClick={onNext}
        >
          {currentStory.media && (
            <img src={currentStory.media} alt="Story content" />
          )}
          {currentStory.content && (
            <p className="story-text">{currentStory.content}</p>
          )}
        </div>

        {/* Controles */}
        <div className="story-controls">
          <button onClick={onPrev} disabled={currentIndex === 0}>
            ←
          </button>
          <button onClick={onNext}>
            →
          </button>
        </div>

        {/* Información de vistas */}
        <div className="story-info">
          <div className="story-views">
            <Eye size={16} />
            <span>{currentStory.views?.length || 0} vistas</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Stories