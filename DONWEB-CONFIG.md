# Configuración DonWeb para NovaStream

## 🌐 Configuración DNS en DonWeb

### Paso 1: Acceder al Panel de Control
1. Ingresa a tu panel de DonWeb
2. Ve a "Dominios" > "Gestión DNS"
3. Selecciona el dominio `novastreamteam.com`

### Paso 2: Configurar Registros DNS para GitHub Pages
Elimina todos los registros existentes y añade:

```
Tipo: CNAME
Nombre: www
Valor: hyplayone527-collab.github.io
TTL: 3600

Tipo: A
Nombre: @
Valor: 185.199.108.153
TTL: 3600

Tipo: A
Nombre: @
Valor: 185.199.109.153
TTL: 3600

Tipo: A
Nombre: @
Valor: 185.199.110.153
TTL: 3600

Tipo: A
Nombre: @
Valor: 185.199.111.153
TTL: 3600
```

### Paso 3: Configurar en GitHub Pages
1. Ve a: https://github.com/hyplayone527-collab/hyplaytube/settings/pages
2. En "Custom domain" ingresa: `www.novastreamteam.com`
3. Marca "Enforce HTTPS"
4. Guarda los cambios

### Paso 4: Backend en Render
El backend ya está configurado en Render:
- URL: https://novastream-backend.onrender.com
- Health check: https://novastream-backend.onrender.com/api/health

## 🔧 URLs del Proyecto

### Frontend (GitHub Pages + DonWeb)
- Producción: https://www.novastreamteam.com
- Alternativa: https://hyplayone527-collab.github.io/hyplaytube
- Redirección: novastreamteam.com → www.novastreamteam.com

### Backend (Render)
- API: https://novastream-backend.onrender.com/api
- Health: https://novastream-backend.onrender.com/api/health

### Repositorio
- GitHub: https://github.com/hyplayone527-collab/hyplaytube

## ⏱️ Tiempos de Propagación
- DNS: 2-24 horas
- GitHub Pages: 10-15 minutos
- Render: Inmediato

## 🧪 Verificación
Después de configurar DNS, verifica:
```bash
ping www.novastreamteam.com
nslookup www.novastreamteam.com
ping novastreamteam.com
```

## 📱 App Móvil
Actualizar en `mobile-app/src/config/api.js`:
```javascript
const API_BASE_URL = 'https://novastream-backend.onrender.com/api';
```