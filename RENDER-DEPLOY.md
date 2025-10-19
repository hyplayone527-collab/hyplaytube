# 🚀 Desplegar NovaStream Backend en Render.com

## Paso a Paso - ¡Súper Fácil!

### 1. 🌐 Ir a Render.com
- Ve a **https://render.com**
- Haz clic en **"Get Started for Free"**
- Regístrate con tu cuenta de GitHub (recomendado)

### 2. 🔗 Conectar tu Repositorio
- Una vez dentro, haz clic en **"New +"**
- Selecciona **"Web Service"**
- Conecta tu cuenta de GitHub si no lo has hecho
- Busca y selecciona tu repositorio: **hyplayone527-collab/hyplaytube**

### 3. ⚙️ Configurar el Servicio

#### Configuración Básica:
- **Name**: `novastream-backend`
- **Region**: `Oregon (US West)` (o el más cercano)
- **Branch**: `main`
- **Root Directory**: Dejar vacío
- **Runtime**: `Node`

#### Configuración de Build:
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

#### Plan:
- Selecciona **"Free"** (0$/mes)

### 4. 🔧 Variables de Entorno

En la sección **Environment Variables**, agregar:

```
NODE_ENV = production
PORT = 10000
JWT_SECRET = tu_secreto_super_seguro_aqui_123456
FRONTEND_URL = https://www.novastreamteam.com
```

**⚠️ Importante**: Cambia `JWT_SECRET` por algo único y seguro.

### 5. 🚀 Desplegar

- Haz clic en **"Create Web Service"**
- Render automáticamente:
  - Clonará tu repositorio
  - Instalará las dependencias
  - Iniciará el servidor
  - Te dará una URL como: `https://novastream-backend.onrender.com`

### 6. ✅ Verificar que Funciona

Una vez desplegado, visita:
- **https://tu-app.onrender.com/api/health**
- Deberías ver: `{"status":"OK","message":"NovaStream Backend is running"}`

## 🎯 URLs Finales

Después del despliegue tendrás:
- **Backend API**: `https://novastream-backend.onrender.com`
- **Health Check**: `https://novastream-backend.onrender.com/api/health`
- **Frontend**: `https://www.novastreamteam.com`

## 🔧 Configuración Automática

Tu proyecto ya tiene configurado:
- ✅ `render.yaml` - Configuración automática
- ✅ `package.json` - Scripts de inicio
- ✅ Variables de entorno
- ✅ Health check endpoint
- ✅ CORS configurado

## 📱 Actualizar App Móvil

Una vez desplegado, actualiza `mobile-app/src/config/api.js`:

```javascript
BASE_URL: isDevelopment 
  ? 'http://TU_IP_LOCAL:5001/api'
  : 'https://novastream-backend.onrender.com/api'
```

## 🐛 Solución de Problemas

### Si el despliegue falla:
1. **Verificar logs** en el dashboard de Render
2. **Comprobar package.json** en la carpeta backend
3. **Verificar que todas las dependencias** están listadas

### Si la app no inicia:
1. **Verificar variables de entorno**
2. **Comprobar que el puerto** es 10000
3. **Revisar logs** para errores específicos

### Si hay errores de CORS:
1. **Verificar FRONTEND_URL** en variables de entorno
2. **Comprobar que coincide** con tu dominio

## 🎉 ¡Listo!

Una vez desplegado:
- ✅ Tu backend estará funcionando 24/7
- ✅ Tu app web tendrá todas las funcionalidades
- ✅ La app móvil se podrá conectar
- ✅ Tendrás una API REST completa

## 💡 Consejos

### Para Desarrollo:
- Los logs se ven en tiempo real en Render
- Los cambios en GitHub se despliegan automáticamente
- El plan gratuito incluye 750 horas/mes

### Para Producción:
- Considera upgradar al plan pagado para mejor rendimiento
- Configura un dominio personalizado si quieres
- Activa las métricas y monitoreo

---

**🚀 ¡Tu backend estará funcionando en menos de 10 minutos!**