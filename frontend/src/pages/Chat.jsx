import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Send, Search, ArrowLeft } from 'lucide-react'
import axios from 'axios'
import io from 'socket.io-client'

const Chat = () => {
  const { chatId } = useParams()
  const { user } = useAuth()
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showMobileChat, setShowMobileChat] = useState(false)
  
  const messagesEndRef = useRef(null)
  const socketRef = useRef(null)

  useEffect(() => {
    // Conectar a Socket.IO
    socketRef.current = io('http://localhost:5001')
    
    fetchChats()
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId)
      setShowMobileChat(true)
    }
  }, [chatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (activeChat && socketRef.current) {
      socketRef.current.emit('join-chat', activeChat._id)
      
      socketRef.current.on('receive-message', (message) => {
        setMessages(prev => [...prev, message])
      })
    }
  }, [activeChat])

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/chats')
      setChats(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error al cargar chats:', error)
      setLoading(false)
    }
  }

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/chats/${chatId}`)
      setActiveChat(response.data)
      setMessages(response.data.messages || [])
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
    }
  }

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      const response = await axios.get(`http://localhost:5001/api/users/search?q=${query}`)
      setSearchResults(response.data)
    } catch (error) {
      console.error('Error al buscar usuarios:', error)
    }
  }

  const createChat = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5001/api/chats', { userId })
      
      // Actualizar lista de chats si es un chat nuevo
      const existingChat = chats.find(chat => chat._id === response.data._id)
      if (!existingChat) {
        setChats(prev => [response.data, ...prev])
      }
      
      setActiveChat(response.data)
      setMessages(response.data.messages || [])
      setSearchQuery('')
      setSearchResults([])
      setShowMobileChat(true)
    } catch (error) {
      console.error('Error al crear chat:', error)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !activeChat) return

    const messageData = {
      chatId: activeChat._id,
      content: newMessage.trim(),
      sender: user,
      timestamp: new Date()
    }

    try {
      // Enviar mensaje al servidor
      await axios.post(`http://localhost:5001/api/chats/${activeChat._id}/messages`, {
        content: newMessage.trim()
      })

      // Emitir mensaje via Socket.IO
      socketRef.current.emit('send-message', messageData)
      
      // Agregar mensaje localmente
      setMessages(prev => [...prev, messageData])
      setNewMessage('')
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOtherParticipant = (chat) => {
    return chat.participants.find(p => p._id !== user._id)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando chats...</p>
      </div>
    )
  }

  return (
    <div className="chat-container">
      {/* Lista de chats */}
      <div className={`chat-sidebar ${showMobileChat ? 'hidden-mobile' : ''}`}>
        <div className="chat-sidebar-header">
          <h2>Mensajes</h2>
        </div>

        <div className="chat-search">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                searchUsers(e.target.value)
              }}
              className="search-input"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(searchUser => (
                <div 
                  key={searchUser._id}
                  className="search-result"
                  onClick={() => createChat(searchUser._id)}
                >
                  <img 
                    src={searchUser.avatar || '/default-avatar.png'} 
                    alt={searchUser.fullName}
                    className="user-avatar-small"
                  />
                  <div className="user-info">
                    <p className="user-name">{searchUser.fullName}</p>
                    <p className="user-username">@{searchUser.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chats-list">
          {chats.length === 0 ? (
            <div className="empty-chats">
              <p>No tienes conversaciones aún.</p>
              <p>Busca usuarios para empezar a chatear.</p>
            </div>
          ) : (
            chats.map(chat => {
              const otherUser = getOtherParticipant(chat)
              const lastMessage = chat.messages[chat.messages.length - 1]
              
              return (
                <div 
                  key={chat._id}
                  className={`chat-item ${activeChat?._id === chat._id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveChat(chat)
                    fetchChatMessages(chat._id)
                    setShowMobileChat(true)
                  }}
                >
                  <img 
                    src={otherUser?.avatar || '/default-avatar.png'} 
                    alt={otherUser?.fullName}
                    className="user-avatar-small"
                  />
                  <div className="chat-info">
                    <p className="chat-name">{otherUser?.fullName}</p>
                    <p className="chat-username">@{otherUser?.username}</p>
                    {lastMessage && (
                      <p className="last-message">
                        {lastMessage.content.length > 30 
                          ? `${lastMessage.content.substring(0, 30)}...` 
                          : lastMessage.content
                        }
                      </p>
                    )}
                  </div>
                  {lastMessage && (
                    <span className="message-time">
                      {formatMessageTime(lastMessage.timestamp)}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Área de chat */}
      <div className={`chat-main ${!showMobileChat ? 'hidden-mobile' : ''}`}>
        {activeChat ? (
          <>
            <div className="chat-header">
              <button 
                className="back-btn mobile-only"
                onClick={() => setShowMobileChat(false)}
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="chat-header-info">
                <img 
                  src={getOtherParticipant(activeChat)?.avatar || '/default-avatar.png'} 
                  alt={getOtherParticipant(activeChat)?.fullName}
                  className="user-avatar-small"
                />
                <div>
                  <p className="chat-header-name">{getOtherParticipant(activeChat)?.fullName}</p>
                  <p className="chat-header-username">@{getOtherParticipant(activeChat)?.username}</p>
                </div>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`message ${message.sender._id === user._id ? 'own' : 'other'}`}
                >
                  {message.sender._id !== user._id && (
                    <img 
                      src={message.sender.avatar || '/default-avatar.png'} 
                      alt={message.sender.fullName}
                      className="message-avatar"
                    />
                  )}
                  <div className="message-content">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {formatMessageTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="message-input"
              />
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="send-btn"
              >
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Selecciona una conversación</h3>
            <p>Elige una conversación existente o busca usuarios para empezar a chatear.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
