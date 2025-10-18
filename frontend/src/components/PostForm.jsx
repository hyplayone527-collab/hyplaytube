import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Image, Send } from 'lucide-react'
import axios from 'axios'

const PostForm = ({ onPostCreated }) => {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('El contenido no puede estar vacío')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:5001/api/posts', {
        content: content.trim(),
        image
      })

      onPostCreated(response.data)
      setContent('')
      setImage('')
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear el post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-form-container">
      <div className="post-form-header">
        <img 
          src={user?.avatar || '/default-avatar.png'} 
          alt={user?.fullName}
          className="user-avatar-small"
        />
        <div className="user-info-small">
          <p className="user-name-small">{user?.fullName}</p>
          <p className="user-username-small">@{user?.username}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué está pasando?"
          className="post-textarea"
          maxLength={280}
          rows={3}
        />

        <div className="character-count">
          {content.length}/280
        </div>

        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
            <button 
              type="button" 
              onClick={() => setImage('')}
              className="remove-image-btn"
            >
              ×
            </button>
          </div>
        )}

        <div className="post-form-actions">
          <div className="post-options">
            <button 
              type="button" 
              className="option-btn"
              onClick={() => {
                const url = prompt('URL de la imagen:')
                if (url) setImage(url)
              }}
            >
              <Image size={20} />
            </button>
          </div>

          <button 
            type="submit" 
            className="post-submit-btn"
            disabled={loading || !content.trim()}
          >
            {loading ? (
              'Publicando...'
            ) : (
              <>
                <Send size={16} />
                Publicar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
