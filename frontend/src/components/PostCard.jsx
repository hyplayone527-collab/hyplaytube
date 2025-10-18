import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2 } from 'lucide-react'
import axios from 'axios'

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const isLiked = post.likes.some(like => like._id === user._id)
  const isOwner = post.author._id === user._id

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/api/posts/${post._id}/like`)
      onUpdate(response.data)
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const response = await axios.post(`http://localhost:5001/api/posts/${post._id}/comment`, {
        content: newComment.trim()
      })
      onUpdate(response.data)
      setNewComment('')
    } catch (error) {
      console.error('Error al comentar:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      try {
        await axios.delete(`http://localhost:5001/api/posts/${post._id}`)
        onDelete(post._id)
      } catch (error) {
        console.error('Error al eliminar post:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d`
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`/profile/${post.author.username}`} className="post-author">
          <img 
            src={post.author.avatar || '/default-avatar.png'} 
            alt={post.author.fullName}
            className="user-avatar-small"
          />
          <div className="author-info">
            <p className="author-name">{post.author.fullName}</p>
            <p className="author-username">@{post.author.username}</p>
          </div>
        </Link>
        
        <div className="post-meta">
          <span className="post-date">{formatDate(post.createdAt)}</span>
          
          {isOwner && (
            <div className="post-menu">
              <button 
                className="menu-toggle"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal size={16} />
              </button>
              
              {showMenu && (
                <div className="menu-dropdown">
                  <button onClick={handleDelete} className="menu-item delete">
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes.length}</span>
        </button>

        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </button>

        <button className="action-btn">
          <Share size={18} />
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt={user?.fullName}
              className="user-avatar-tiny"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="comment-input"
              maxLength={280}
            />
            <button 
              type="submit" 
              disabled={loading || !newComment.trim()}
              className="comment-submit"
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </form>

          <div className="comments-list">
            {post.comments.map((comment, index) => (
              <div key={index} className="comment">
                <Link to={`/profile/${comment.author.username}`} className="comment-author">
                  <img 
                    src={comment.author.avatar || '/default-avatar.png'} 
                    alt={comment.author.fullName}
                    className="user-avatar-tiny"
                  />
                </Link>
                <div className="comment-content">
                  <div className="comment-header">
                    <Link to={`/profile/${comment.author.username}`} className="comment-author-name">
                      {comment.author.fullName}
                    </Link>
                    <span className="comment-username">@{comment.author.username}</span>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
