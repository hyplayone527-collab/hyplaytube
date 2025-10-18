# NovaStream Mobile App

Aplicación móvil de NovaStream desarrollada con React Native y Expo.

## 🚀 Características

- **Autenticación completa** - Login y registro de usuarios
- **Feed de posts** - Visualización de contenido multimedia
- **Stories temporales** - Historias que desaparecen en 24 horas
- **Cámara integrada** - Captura de fotos y videos
- **Chat en tiempo real** - Mensajería instantánea (próximamente)
- **Notificaciones push** - Alertas en tiempo real (próximamente)
- **Perfil de usuario** - Gestión de cuenta personal

## 📱 Tecnologías

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma de desarrollo y despliegue
- **React Navigation** - Navegación entre pantallas
- **Socket.IO** - Comunicación en tiempo real
- **Axios** - Cliente HTTP para API calls
- **AsyncStorage** - Almacenamiento local persistente

## 🛠️ Instalación

### Prerrequisitos

```bash
# Instalar Node.js (versión 16 o superior)
# Instalar Expo CLI globalmente
npm install -g @expo/cli

# Para desarrollo en Android
# Instalar Android Studio y configurar emulador

# Para desarrollo en iOS (solo macOS)
# Instalar Xcode
```

### Configuración del proyecto

```bash
# 1. Navegar a la carpeta de la app móvil
cd mobile-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Editar las URLs del backend en los servicios si es necesario

# 4. Iniciar el servidor de desarrollo
npm start
```

### Ejecutar en dispositivos

```bash
# Ejecutar en Android (emulador o dispositivo físico)
npm run android

# Ejecutar en iOS (solo macOS)
npm run ios

# Ejecutar en navegador web
npm run web
```

## 📁 Estructura del Proyecto

```
mobile-app/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── PostCard.js     # Tarjeta de post
│   │   └── StoriesBar.js   # Barra de stories
│   ├── context/            # Context API
│   │   ├── AuthContext.js  # Contexto de autenticación
│   │   └── SocketContext.js # Contexto de WebSocket
│   ├── screens/            # Pantallas de la app
│   │   ├── LoginScreen.js  # Pantalla de login
│   │   ├── RegisterScreen.js # Pantalla de registro
│   │   ├── HomeScreen.js   # Pantalla principal
│   │   ├── CameraScreen.js # Pantalla de cámara
│   │   ├── ProfileScreen.js # Pantalla de perfil
│   │   └── ...
│   └── services/           # Servicios de API
│       ├── authService.js  # Servicio de autenticación
│       └── postService.js  # Servicio de posts
├── App.js                  # Componente principal
├── app.json               # Configuración de Expo
└── package.json           # Dependencias del proyecto
```

## 🔧 Configuración del Backend

La app móvil se conecta al backend de NovaStream. Asegúrate de que el servidor esté ejecutándose:

```bash
# En la carpeta raíz del proyecto
cd backend
npm run dev
```

El backend debe estar disponible en `http://localhost:5001`

## 📱 Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de autenticación (login/registro)
- [x] Navegación por tabs
- [x] Pantalla principal con feed
- [x] Componente de posts con likes y comentarios
- [x] Barra de stories
- [x] Cámara para capturar contenido
- [x] Perfil de usuario básico
- [x] Integración con Socket.IO

### 🚧 En Desarrollo
- [ ] Reproducción de videos
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Subida de archivos multimedia
- [ ] Sistema de búsqueda
- [ ] Configuraciones de usuario

### 🔮 Próximamente
- [ ] Stories con temporizador
- [ ] Filtros de cámara
- [ ] Modo oscuro/claro
- [ ] Compartir contenido
- [ ] Sistema de logros
- [ ] Notificaciones locales

## 🎨 Diseño

La aplicación utiliza un tema oscuro consistente con la plataforma web:

- **Color primario**: #4ecdc4 (turquesa)
- **Color secundario**: #ff6b6b (coral)
- **Fondo**: #0f0f0f (negro)
- **Superficie**: #1a1a1a (gris oscuro)
- **Texto**: #ffffff (blanco)

## 🔗 Conexión con Backend

La app se conecta al backend de NovaStream mediante:

- **API REST** para operaciones CRUD
- **WebSocket** para funcionalidades en tiempo real
- **JWT** para autenticación segura

## 📝 Scripts Disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en navegador
npm run build      # Construir para producción
```

## 🐛 Solución de Problemas

### Error de conexión al backend
- Verificar que el backend esté ejecutándose en el puerto 5001
- Comprobar la configuración de red (usar IP local en dispositivos físicos)

### Problemas con la cámara
- Verificar permisos de cámara en el dispositivo
- Reiniciar la aplicación si los permisos fueron otorgados recientemente

### Error de dependencias
```bash
# Limpiar caché y reinstalar
rm -rf node_modules
npm install
```

## 📄 Licencia

Este proyecto es parte de NovaStream y está bajo la misma licencia MIT.

## 👥 Contribuir

Para contribuir al desarrollo de la app móvil:

1. Fork el repositorio
2. Crear una rama para tu feature
3. Hacer commit de los cambios
4. Push a la rama
5. Crear un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features, crear un issue en el repositorio principal de NovaStream.