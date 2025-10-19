# ✅ Checklist de Despliegue en Render

## Antes de Empezar

- [ ] Tienes cuenta en GitHub
- [ ] Tu código está subido a GitHub
- [ ] Tienes acceso a internet

## Paso 1: Crear Cuenta en Render

- [ ] Ir a https://render.com
- [ ] Hacer clic en "Get Started for Free"
- [ ] Registrarse con GitHub (recomendado)
- [ ] Verificar email si es necesario

## Paso 2: Crear Web Service

- [ ] Hacer clic en "New +" en el dashboard
- [ ] Seleccionar "Web Service"
- [ ] Conectar cuenta de GitHub
- [ ] Seleccionar repositorio: `hyplayone527-collab/hyplaytube`
- [ ] Hacer clic en "Connect"

## Paso 3: Configurar Servicio

### Configuración Básica:
- [ ] **Name**: `novastream-backend`
- [ ] **Region**: `Oregon (US West)` o el más cercano
- [ ] **Branch**: `main`
- [ ] **Root Directory**: (dejar vacío)
- [ ] **Runtime**: `Node`

### Configuración de Build:
- [ ] **Build Command**: `cd backend && npm install`
- [ ] **Start Command**: `cd backend && npm start`

### Plan:
- [ ] Seleccionar **"Free"** ($0/mes)

## Paso 4: Variables de Entorno

Agregar estas variables en "Environment Variables":

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `JWT_SECRET` = `tu_secreto_super_seguro_123456`
- [ ] `FRONTEND_URL` = `https://www.novastreamteam.com`

## Paso 5: Desplegar

- [ ] Hacer clic en "Create Web Service"
- [ ] Esperar a que termine el build (5-10 minutos)
- [ ] Verificar que no hay errores en los logs

## Paso 6: Verificar Funcionamiento

- [ ] Copiar la URL generada (ej: `https://novastream-backend.onrender.com`)
- [ ] Visitar `https://tu-url.onrender.com/api/health`
- [ ] Verificar que responde: `{"status":"OK","message":"NovaStream Backend is running"}`

## Paso 7: Actualizar Frontend

- [ ] Ejecutar `actualizar-backend-url.bat`
- [ ] Ingresar la URL de Render cuando se solicite
- [ ] Esperar a que termine la actualización
- [ ] Verificar que se subieron los cambios a GitHub

## Paso 8: Probar Todo

- [ ] Visitar https://www.novastreamteam.com/app.html
- [ ] Intentar registrarse/iniciar sesión
- [ ] Verificar que las funciones funcionan
- [ ] Probar la app móvil si la tienes configurada

## 🎉 ¡Completado!

Si todos los checkboxes están marcados, ¡tu backend está funcionando!

### URLs Finales:
- **Frontend**: https://www.novastreamteam.com
- **Backend**: https://tu-backend.onrender.com
- **API Health**: https://tu-backend.onrender.com/api/health

### Próximos Pasos:
- [ ] Configurar base de datos (opcional)
- [ ] Agregar más funcionalidades
- [ ] Optimizar rendimiento
- [ ] Configurar monitoreo

## 🐛 Si Algo Sale Mal

### Build Falla:
1. Revisar logs en Render dashboard
2. Verificar que `backend/package.json` existe
3. Comprobar que todas las dependencias están listadas

### App No Inicia:
1. Verificar variables de entorno
2. Comprobar que el puerto es 10000
3. Revisar logs para errores específicos

### CORS Errors:
1. Verificar `FRONTEND_URL` en variables de entorno
2. Comprobar que coincide exactamente con tu dominio

### 500 Errors:
1. Revisar logs del servidor
2. Verificar que `JWT_SECRET` está configurado
3. Comprobar que todas las rutas existen

---

**💡 Tip**: Render tiene un plan gratuito que incluye 750 horas/mes, ¡perfecto para proyectos personales!