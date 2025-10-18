import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import Stories from '../components/Stories'
import axios from 'axios'

const Home = () => {
  const { user } = useAuth()
  const { t } = useTheme()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async (pageNum = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/feed?page=${pageNum}&limit=10`)
      
      if (pageNum === 1) {
        setPosts(response.data)
      } else {
        setPosts(prev => [...prev, ...response.data])
      }
      
      setHasMore(response.data.length === 10)
      setLoading(false)
    } catch (error) {
      console.error('Error al cargar el feed:', error)
      setLoading(false)
    }
  }

  const handleNewPost = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }

  const handlePostUpdate = (updatedPost) => {
    setPosts(prev => prev.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ))
  }

  const handlePostDelete = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId))
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchFeed(nextPage)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando feed...</p>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="welcome-section">
          <h1>¡Hola, {user?.fullName}!</h1>
          <p>{t('whatsHappening')}</p>
        </div>

        <Stories />

        <PostForm onPostCreated={handleNewPost} />

        <div className="posts-section">
          <h2>Tu Feed</h2>
          
          {posts.length === 0 ? (
            <div className="empty-feed">
              <p>No hay posts en tu feed aún.</p>
              <p>¡Sigue a algunos usuarios para ver sus publicaciones!</p>
            </div>
          ) : (
            <>
              {posts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  onUpdate={handlePostUpdate}
                  onDelete={handlePostDelete}
                />
              ))}
              
              {hasMore && (
                <button 
                  onClick={loadMore} 
                  className="load-more-btn"
                >
                  Cargar más posts
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home