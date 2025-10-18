import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import { Calendar, MapPin, Link as LinkIcon, Edit, UserPlus, UserMinus, MessageCircle } from 'lucide-react'
import axios from 'axios'

const Profile = () => {
  const { username } = useParams()
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  const isOwnProfile = currentUser?.username === username

  useEffect(() => {
    fetchUserProfile()
    fetchUserPosts()
  }, [username])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/profile/${username}`)
      setUser(response.data)
      setIsFollowing(response.data.followers.some(follower => follower._id === currentUser._id))
    } catch (error) {
      console.error('Error al cargar perfil:', error)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/user/${username}`)
      setPosts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error al cargar posts:', error)
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    setFollowLoading(true)
    try {
      if (isFollowing) {
        await axios.post(`http://localhost:5000/api/users/unfollow/${user._id}`)
        setIsFollowing(false)
        setUser(prev => ({
          ...prev,
          followers: prev.followers.filter(f => f._id !== currentUser._id)
        }))
      } else {
        await axios.post(`http://localhost:5000/api/users/follow/${user._id}`)
        setIsFollowing(true)
        setUser(prev => ({
          ...prev,
          followers: [...prev.followers, currentUser]
        }))
      }
    } catch (error) {
      console.error('Error al seguir/dejar de seguir:', error)
    } finally {
      setFollowLoading(false)
    }
  }

  const handlePostUpdate = (updatedPost) => {
    setPosts(prev => prev.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ))
  }

  const handlePostDelete = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId))
  }

  if (loading || !user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          {/* Aquí podrías agregar una imagen de portada */}
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-section">
            <img 
              src={user.avatar || '/default-avatar.png'} 
              alt={user.fullName}
              className="profile-avatar"
            />
            
            <div className="profile-actions">
              {isOwnProfile ? (
                <button className="profile-btn edit-btn">
                  <Edit size={16} />
                  Editar Perfil
                </button>
              ) : (
                <div className="profile-action-buttons">
                  <button 
                    className={`profile-btn ${isFollowing ? 'following' : 'follow'}`}
                    onClick={handleFollow}
                    disabled={followLoading}
                  >
                    {followLoading ? '...' : (
                      <>
                        {isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
                        {isFollowing ? 'Siguiendo' : 'Seguir'}
                      </>
                    )}
                  </button>
                  
                  <button className="profile-btn message-btn">
                    <MessageCircle size={16} />
                    Mensaje
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{user.fullName}</h1>
            <p className="profile-username">@{user.username}</p>
            
            {user.bio && (
              <p className="profile-bio">{user.bio}</p>
            )}

            <div className="profile-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>Se unió en {new Date(user.createdAt).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long' 
                })}</span>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{user.following.length}</span>
                <span className="stat-label">Siguiendo</span>
              </div>
              <div className="stat">
                <span className="stat-number">{user.followers.length}</span>
                <span className="stat-label">Seguidores</span>
              </div>
              <div className="stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button className="tab active">Posts</button>
          <button className="tab">Respuestas</button>
          <button className="tab">Me gusta</button>
        </div>

        <div className="profile-posts">
          {posts.length === 0 ? (
            <div className="empty-posts">
              <p>
                {isOwnProfile 
                  ? 'Aún no has publicado nada. ¡Comparte tu primer post!' 
                  : `@${user.username} aún no ha publicado nada.`
                }
              </p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard 
                key={post._id} 
                post={post} 
                onUpdate={handlePostUpdate}
                onDelete={handlePostDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile