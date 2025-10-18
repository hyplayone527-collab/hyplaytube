# 💻 Código Destacado - Red Social

## 🚀 Ejemplos del Código Principal

### 🔧 Backend - Servidor Express con Socket.IO

```javascript
// backend/server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Socket.IO para chat en tiempo real
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("send-message", (data) => {
    socket.to(data.chatId).emit("receive-message", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
```

### 📊 Base de Datos JSON - Sin MongoDB

```javascript
// backend/database/db.js
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, 'data.json');

// Estructura de la base de datos
const initialDB = {
  users: [],
  posts: [],
  chats: []
};

// Operaciones CRUD
export const create = (collection, data) => {
  const db = readDB();
  const newItem = {
    _id: generateId(),
    ...data,
    createdAt: new Date().toISOString()
  };
  db[collection].push(newItem);
  writeDB(db);
  return newItem;
};

export const find = (collection, query = {}) => {
  const db = readDB();
  return db[collection].filter(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
};
```

### 🎨 Frontend - Componente de Post

```jsx
// frontend/src/components/PostCard.jsx
import { useState } from 'react'
import { Heart, MessageCircle, Share } from 'lucide-react'

const PostCard = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false)
  const { user } = useAuth()

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${post._id}/like`)
      onUpdate(response.data)
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.author.avatar} alt={post.author.fullName} />
        <div className="author-info">
          <p className="author-name">{post.author.fullName}</p>
          <p className="author-username">@{post.author.username}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post content" />}
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
          <Heart size={18} />
          <span>{post.likes.length}</span>
        </button>
        
        <button onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </button>
      </div>
    </div>
  )
}
```

### 🔐 Autenticación con Context API

```jsx
// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email, password
      })

      const { token, ...userData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message 
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### 💬 Chat en Tiempo Real

```jsx
// frontend/src/pages/Chat.jsx
import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const Chat = () => {
  const socketRef = useRef(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Conectar a Socket.IO
    socketRef.current = io('http://localhost:5000')
    
    socketRef.current.on('receive-message', (message) => {
      setMessages(prev => [...prev, message])
    })

    return () => socketRef.current.disconnect()
  }, [])

  const sendMessage = async (content) => {
    try {
      await axios.post(`http://localhost:5000/api/chats/${chatId}/messages`, {
        content
      })

      // Emitir mensaje via Socket.IO
      socketRef.current.emit('send-message', {
        chatId,
        content,
        sender: user
      })
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
    }
  }

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map(message => (
          <div key={message._id} className="message">
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
```

## 🎯 Arquitectura del Proyecto

### 📁 Estructura de Carpetas
```
red-social/
├── backend/
│   ├── controllers/        # Lógica de negocio
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── chatController.js
│   ├── models/            # Modelos de datos
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Chat.js
│   ├── routes/            # Rutas de la API
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   └── chatRoutes.js
│   ├── middleware/        # Middleware personalizado
│   │   └── auth.js
│   ├── database/          # Base de datos JSON
│   │   ├── db.js
│   │   └── data.json
│   └── server.js          # Punto de entrada
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── PostForm.jsx
│   │   ├── pages/         # Páginas principales
│   │   │   ├── Home.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/       # Gestión de estado
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx        # Componente principal
│   └── public/            # Archivos estáticos
└── docker-compose.yml     # Configuración Docker
```

### 🔄 Flujo de Datos
```
Usuario → Frontend (React) → API REST → Base de datos JSON
                ↓
        Socket.IO ← Chat en tiempo real
```

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Propósito |
|-----------|------------|-----------|
| **Backend** | Node.js + Express | Servidor y API REST |
| **Base de datos** | JSON local | Almacenamiento sin dependencias |
| **Tiempo real** | Socket.IO | Chat instantáneo |
| **Autenticación** | JWT | Seguridad y sesiones |
| **Frontend** | React 18 + Vite | Interfaz de usuario |
| **Routing** | React Router | Navegación SPA |
| **HTTP Client** | Axios | Peticiones al API |
| **Iconos** | Lucide React | Iconografía moderna |
| **Estilos** | CSS moderno | Diseño responsivo |