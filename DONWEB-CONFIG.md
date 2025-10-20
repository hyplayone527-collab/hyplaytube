# Configuración DonWeb para NovaStream

## 🌐 Configuración DNS en DonWeb

### Paso 1: Acceder al Panel de Control
1. Ingresa a tu panel de DonWeb
2. Ve a "Dominios" > "Gestión DNS" 
3. Selecciona el dominio `novastreamteam.com`
4. Haz clic en "Editar zona DNS" o "Administrar DNS"

### Paso 2: Configurar Registros DNS para GitHub Pages
Elimina todos los registros existentes y añade estos registros:

#### Registros A (para dominio raíz):
```
Tipo: A
Nombre: @
Valor: 185.199.108.153

Tipo: A
Nombre: @
Valor: 185.199.109.153

Tipo: A
Nombre: @
Valor: 185.199.110.153

Tipo: A
Nombre: @
Valor: 185.199.111.153
```

#### Registros CNAME (para subdominios):
```
Tipo: CNAME
Nombre: www
Valor: novastreamteam.com

Tipo: CNAME
Nombre: app
Valor: hyplayone527-collab.github.io

Tipo: CNAME
Nombre: stream
Valor: hyplayone527-collab.github.io
```

**Configuración de subdominios**: 
- Dominio principal: `novastreamteam.com` (landing/info)
- App completa: `app.novastreamteam.com` 
- Stream alternativo: `stream.novastreamteam.com`
- Redirección www: `www.novastreamteam.com` → `novastreamteam.com`
- DonWeb maneja automáticamente el TTL

### 📝 Instrucciones específicas para DonWeb:
1. **Eliminar registros existentes**: Borra todos los registros A y CNAME actuales
2. **Añadir SOLO registros A** (uno por uno):
   - Campo "Nombre": `@` (o dejar vacío para dominio raíz)
   - Campo "IP" o "Valor": Las 4 IPs de GitHub Pages
3. **NO añadir registro CNAME** para www
4. **Guardar cambios** y esperar propagación

### Paso 3: Configurar en GitHub Pages
1. Ve a: https://github.com/hyplayone527-collab/hyplaytube/settings/pages
2. En "Custom domain" ingresa: `novastreamteam.com` (sin www)
3. Marca "Enforce HTTPS"
4. Guarda los cambios
5. GitHub creará automáticamente el archivo CNAME en tu repositorio

### Paso 4: Configurar Subdominios en GitHub Pages

#### Para el subdominio de la app completa:
1. **Crear repositorio separado** (recomendado):
   - Nuevo repo: `novastream-app`
   - Subir solo la aplicación completa
   - Configurar GitHub Pages con dominio: `app.novastreamteam.com`

2. **O usar carpetas en el mismo repo**:
   - Crear carpeta `/app/` con la aplicación completa
   - GitHub Pages servirá: `app.novastreamteam.com` → `/app/index.html`

#### Estructura recomendada:
```
novastreamteam.com/          → Landing page/info
app.novastreamteam.com/      → Aplicación completa NovaStream
stream.novastreamteam.com/   → Versión alternativa/móvil
```

### Paso 5: Backend en Render
El backend ya está configurado en Render:
- URL: https://novastream-backend.onrender.com
- Health check: https://novastream-backend.onrender.com/api/health

## 🔧 URLs del Proyecto

### Frontend (GitHub Pages + DonWeb)
- Landing/Info: https://novastreamteam.com
- **App Completa: https://app.novastreamteam.com**
- Stream Alt: https://stream.novastreamteam.com
- Alternativa: https://hyplayone527-collab.github.io/hyplaytube
- Redirección: www.novastreamteam.com → novastreamteam.com

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
# Dominio principal
ping novastreamteam.com
nslookup novastreamteam.com

# Subdominios
ping app.novastreamteam.com
ping stream.novastreamteam.com
ping www.novastreamteam.com
```

### Comandos de verificación adicionales:
```bash
# Verificar registros A (dominio principal)
nslookup -type=A novastreamteam.com

# Verificar registros CNAME (subdominios)
nslookup -type=CNAME app.novastreamteam.com
nslookup -type=CNAME stream.novastreamteam.com
nslookup -type=CNAME www.novastreamteam.com

# Verificar propagación DNS
curl -I https://novastreamteam.com
curl -I https://app.novastreamteam.com
```

## 📱 App Móvil
Actualizar en `mobile-app/src/config/api.js`:
```javascript
const API_BASE_URL = 'https://novastream-backend.onrender.com/api';
```

## 📂 Archivos Creados

### Estructura de subdominios:
- `/CNAME` - Dominio principal: `novastreamteam.com`
- `/landing.html` - Landing page para el dominio principal
- `/app/CNAME` - Subdominio: `app.novastreamteam.com`
- `/app/index.html` - Aplicación completa
- `/app/app.js` - JavaScript de la aplicación

### Próximos pasos:
1. Configurar DNS en DonWeb (ver arriba)
2. Renombrar `landing.html` → `index.html` para producción
3. Hacer commit y push de los cambios
4. Configurar GitHub Pages con el dominio personalizado
5. Esperar propagación DNS (2-24 horas)

Ver `SUBDOMINIO-SETUP.md` para instrucciones detalladas.