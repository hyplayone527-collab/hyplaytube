# 🚀 Guía de Despliegue NovaStream

## 📱 Configurar App Móvil para Desarrollo

### Paso 1: Obtener tu IP local

**Windows:**
```cmd
ipconfig
```
Busca "Adaptador de LAN inalámbrica Wi-Fi" y copia la "Dirección IPv4"

**Mac/Linux:**
```bash
ifconfig
```
Busca tu interfaz WiFi y copia la dirección inet

### Paso 2: Actualizar configuración móvil

Edita el archivo `mobile-app/src/config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://TU_IP_AQUI:5001/api'  // ⚠️ Cambia TU_IP_AQUI por tu IP real
    : 'https://novastream-backend.onrender.com/api',
    
  SOCKET_URL: isDevelopment
    ? 'http://TU_IP_AQUI:5001'      // ⚠️ Cambia TU_IP_AQUI por tu IP real
    : 'https://novastream-backend.onrender.com',
};
```

**Ejemplo:**
Si tu IP es `192.168.1.105`, entonces:
```javascript
BASE_URL: 'http://192.168.1.105:5001/api'
SOCKET_URL: 'http://192.168.1.105:5001'
```

### Paso 3: Ejecutar backend y app móvil

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - App Móvil:**
```bash
cd mobile-app
npm start
```

## 🌐 Desplegar en Internet

### Opción 1: Render.com (Backend)

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Conecta tu repositorio de GitHub
3. Crea un nuevo "Web Service"
4. Usa estas configuraciones:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** Node.js

### Opción 2: Railway.app (Backend)

1. Ve a [railway.app](https://railway.app)
2. Conecta tu GitHub
3. Deploy desde tu repositorio
4. Configura las variables de entorno

### Variables de Entorno Necesarias:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=tu_secreto_jwt_super_seguro
FRONTEND_URL=https://novastreamteam.com
```

## 🔧 Configuración de Dominio

Tu dominio `novastreamteam.com` ya está configurado en GitHub Pages.

### Para actualizar el sitio web:

```bash
# Ejecutar script de despliegue
./deploy.bat    # Windows
./deploy.sh     # Mac/Linux
```

## 📱 Publicar App Móvil

### Expo Application Services (EAS)

```bash
cd mobile-app

# Instalar EAS CLI
npm install -g @expo/eas-cli

# Login a Expo
eas login

# Configurar proyecto
eas build:configure

# Build para Android
eas build --platform android

# Build para iOS (requiere cuenta de desarrollador Apple)
eas build --platform ios
```

### Google Play Store

1. Crear cuenta de desarrollador en Google Play Console
2. Subir el APK generado por EAS
3. Completar información de la app
4. Enviar para revisión

### Apple App Store

1. Cuenta de desarrollador Apple ($99/año)
2. Usar Xcode para subir a App Store Connect
3. Completar metadata de la app
4. Enviar para revisión

## 🐛 Solución de Problemas

### Error de conexión en app móvil:
- Verificar que tu IP esté correcta en `api.js`
- Asegurarte de que el backend esté corriendo
- Verificar que estés en la misma red WiFi

### Error 404 en GitHub Pages:
- Verificar que el archivo `index.html` esté en la raíz
- Comprobar que el dominio esté configurado correctamente

### Backend no responde:
- Verificar variables de entorno
- Comprobar logs del servicio de hosting
- Verificar que el puerto esté configurado correctamente

## 📊 Monitoreo

### URLs importantes:
- **Sitio web:** https://novastreamteam.com
- **Backend health:** https://tu-backend.onrender.com/api/health
- **Documentación:** https://novastreamteam.com/docs.html

### Logs y debugging:
- Render.com: Panel de control → Logs
- GitHub Pages: Settings → Pages
- App móvil: Expo Developer Tools