# 🌐 Red Social Completa

<div align="center">

![Red Social](https://img.shields.io/badge/Red%20Social-Completa-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

**🏆 NOVASTREAM - Plataforma de Streaming de Nueva Generación**

**Una plataforma completa de streaming con interfaz tipo YouTube, tema negro original y funcionalidades avanzadas**

[🌐 Ver Sitio Web](https://www.novastreamteam.com) • [🚀 Demo Funcional](https://www.novastreamteam.com/demo.html) • [📱 App Completa](https://www.novastreamteam.com/app.html) • [📚 Documentación](https://www.novastreamteam.com/docs.html)

</div>

---

## 📸 Vista Previa del Proyecto

```
📁 Estructura del Proyecto
├── 🔧 backend/          # API REST + Socket.IO
│   ├── controllers/     # Lógica de negocio
│   ├── models/         # Modelos de datos
│   ├── routes/         # Rutas de la API
│   └── database/       # Base de datos JSON
├── 🎨 frontend/        # Interfaz React
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas principales
│   └── context/       # Gestión de estado
└── 🐳 docker-compose.yml # Configuración Docker
```

## 🌟 Funcionalidades Avanzadas

### 🎥 Historias (Stories)
- ✅ Historias temporales (24h) como Instagram
- ✅ Crear historias con texto, imágenes y colores
- ✅ Ver historias de usuarios seguidos
- ✅ Contador de visualizaciones
- ✅ Interfaz inmersiva con gestos

### 🔔 Notificaciones en Tiempo Real
- ✅ Notificaciones push instantáneas
- ✅ Notificaciones de likes, comentarios y seguidores
- ✅ Centro de notificaciones con contador
- ✅ Marcar como leídas individual o masivamente

### 🏆 Sistema de Logros y Gamificación
- ✅ 8+ logros únicos para desbloquear
- ✅ Sistema de puntos y ranking
- ✅ Leaderboard global de usuarios
- ✅ Notificaciones de logros desbloqueados
- ✅ Verificación automática de progreso

### 🌙 Temas y Personalización
- ✅ Modo oscuro/claro con transiciones suaves
- ✅ Múltiples idiomas (Español/Inglés)
- ✅ Persistencia de preferencias
- ✅ Cambio dinámico de tema

### ⚡ Funcionalidades Básicas Mejoradas
- ✅ Autenticación JWT con seguridad avanzada
- ✅ Posts con texto, imágenes y reacciones
- ✅ Chat en tiempo real con Socket.IO
- ✅ Perfiles completos con estadísticas
- ✅ Feed inteligente y personalizado
- ✅ Búsqueda de usuarios en tiempo real

### 🛡️ Seguridad y Rendimiento
- ✅ Rate limiting para prevenir spam
- ✅ Helmet.js para seguridad HTTP
- ✅ Compresión automática de respuestas
- ✅ Validación de datos en frontend y backend
- ✅ Limpieza automática de datos expirados

### 🎨 Experiencia de Usuario
- ✅ Animaciones fluidas con Framer Motion
- ✅ Interfaz responsiva y moderna
- ✅ Toasts y notificaciones elegantes
- ✅ Estados de carga optimizados
- ✅ Efectos hover y transiciones

## 🛠️ Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **JSON Database** - Base de datos en archivo JSON (sin dependencias externas)
- **Socket.IO** - Chat en tiempo real
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

### Frontend
- **React 18** - Biblioteca de UI
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Socket.IO Client** - Cliente para chat en tiempo real
- **Lucide React** - Iconos
- **Vite** - Build tool

## 📦 Instalación y Configuración

### Opción 1: Con Docker (Recomendado)

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/hyplayone527-collab/hyplaytube
   cd red-social
   ```

2. **Ejecuta con Docker Compose**
   ```bash
   docker-compose up -d
   ``

### Opción  1: Instalación Manual

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/hyplayone527-collab/hyplaytube
   cd hyplaytube
   ```

2. **Configura la ruta hyplaytube**
   ```bash
   cd hyplaytube
   npm install
   cp ../.env.example .env
   # Edita .env con tus configuraciones
   npm run dev
   ```


## ⚙️ Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` basado en `.env.example`:

```env
PORT=5000
JWT_SECRET=tu_jwt_secret_super_secreto_aqui_cambialo_en_produccion
```

## 🚀 Inicio Rápido

### Opción 1: Script de desarrollo (Más fácil)
```bash
# En Windows
dev.bat

# En Linux/Mac
chmod +x dev.sh
./dev.sh
```

### Opción 2: Manual
```bash
# Terminal 1 - Backend
cd hyplaytube
npm install
npm run dev

```

## 🚀 Uso

1. **Registro**: Crea una cuenta nueva con email, nombre de usuario y contraseña
2. **Login**: Inicia sesión con tus credenciales
3. **Explora**: Ve el feed principal con posts de usuarios que sigues
4. **Publica**: Crea posts con texto e imágenes
5. **Interactúa**: Da likes y comenta en posts
6. **Conecta**: Busca y sigue a otros usuarios
7. **Chatea**: Envía mensajes privados en tiempo real

## 📱 Funcionalidades Principales

### Feed de Noticias
- Posts ordenados cronológicamente
- Solo muestra posts de usuarios que sigues
- Paginación para cargar más contenido

### Sistema de Interacciones
- Like/Unlike en posts
- Comentarios con respuestas anidadas
- Contador de interacciones en tiempo real

### Perfiles de Usuario
- Información personal editable
- Lista de seguidores y seguidos
- Historial de posts del usuario
- Estadísticas de actividad

### Chat en Tiempo Real
- Conversaciones privadas 1:1
- Mensajes instantáneos con Socket.IO
- Interfaz similar a WhatsApp/Telegram
- Indicadores de tiempo de mensajes

## 🔧 API Endpoints

### Autenticación
- `POST /api/users/register` - Registro de usuario
- `POST /api/users/login` - Inicio de sesión

### Usuarios
- `GET /api/users/profile/:username` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil
- `POST /api/users/follow/:userId` - Seguir usuario
- `POST /api/users/unfollow/:userId` - Dejar de seguir
- `GET /api/users/search` - Buscar usuarios

### Posts
- `POST /api/posts` - Crear post
- `GET /api/posts/feed` - Obtener feed
- `GET /api/posts/user/:username` - Posts de usuario
- `POST /api/posts/:postId/like` - Like/Unlike
- `POST /api/posts/:postId/comment` - Comentar
- `DELETE /api/posts/:postId` - Eliminar post

### Chat
- `GET /api/chats` - Obtener conversaciones
- `POST /api/chats` - Crear/obtener chat
- `GET /api/chats/:chatId` - Obtener mensajes
- `POST /api/chats/:chatId/messages` - Enviar mensaje

## 🎨 Estructura del Proyecto

```
red-social/
├── backend/
│   ├── controllers/     # Lógica de negocio
│   ├── models/         # Modelos de MongoDB
│   ├── routes/         # Rutas de la API
│   ├── middleware/     # Middleware personalizado
│   ├── config/         # Configuración de DB
│   └── server.js       # Punto de entrada
├── frontend/
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Páginas principales
│   │   ├── context/    # Context API (Auth)
│   │   └── App.jsx     # Componente principal
│   └── public/         # Archivos estáticos
└── docker-compose.yml  # Configuración Docker
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación JWT con expiración
- Validación de datos en frontend y backend
- Protección de rutas privadas
- Sanitización de inputs

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🚀 Próximas Funcionalidades

- [ ] Notificaciones push
- [ ] Historias/Stories
- [ ] Grupos y comunidades
- [ ] Videollamadas
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] Compartir posts
- [ ] Trending topics

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor:
1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue si es necesario

---

⭐ **¡No olvides dar una estrella al proyecto si te gustó!** ⭐
