# 🌐 Configuración de Subdominios para NovaStream

## Estructura de Subdominios

### Dominio Principal
- **www.novastreamteam.com** - Página principal y landing page

### Subdominios Planificados
- **app.novastreamteam.com** - Aplicación web completa de NovaStream
- **api.novastreamteam.com** - Backend y API REST
- **docs.novastreamteam.com** - Documentación técnica
- **demo.novastreamteam.com** - Demo funcional sin backend
- **admin.novastreamteam.com** - Panel de administración
- **cdn.novastreamteam.com** - Archivos estáticos y multimedia

## Configuración DNS Necesaria

Para configurar los subdominios, necesitas agregar registros CNAME en tu proveedor de dominio:

```
Tipo    Nombre    Valor
CNAME   www       hyplayone527-collab.github.io
CNAME   app       hyplayone527-collab.github.io
CNAME   api       novastream-backend.onrender.com
CNAME   docs      hyplayone527-collab.github.io
CNAME   demo      hyplayone527-collab.github.io
CNAME   admin     hyplayone527-collab.github.io
CNAME   cdn       hyplayone527-collab.github.io
```

## Repositorios Separados (Recomendado)

### Opción 1: Repositorios Independientes
- `novastreamteam/novastreamteam.github.io` - Página principal
- `novastreamteam/app` - Aplicación web
- `novastreamteam/docs` - Documentación
- `novastreamteam/demo` - Demo funcional

### Opción 2: Ramas en el mismo repositorio
- `main` - Página principal
- `app` - Aplicación web
- `docs` - Documentación
- `demo` - Demo

## Configuración GitHub Pages

### Para cada subdominio:
1. Crear repositorio o rama correspondiente
2. Configurar GitHub Pages en Settings
3. Agregar archivo CNAME con el subdominio
4. Configurar DNS en tu proveedor

## Ventajas de los Subdominios

### 🚀 Rendimiento
- Carga más rápida al separar contenido
- CDN optimizado para cada tipo de contenido
- Cacheo independiente

### 🔧 Mantenimiento
- Despliegues independientes
- Versionado separado
- Rollbacks específicos

### 🔒 Seguridad
- Aislamiento de aplicaciones
- Políticas de seguridad específicas
- Certificados SSL independientes

### 📊 Analytics
- Métricas separadas por función
- Mejor tracking de usuarios
- Análisis de rendimiento específico

## Implementación Paso a Paso

### Paso 1: Configurar DNS
1. Acceder al panel de tu proveedor de dominio
2. Agregar registros CNAME para cada subdominio
3. Esperar propagación DNS (24-48 horas)

### Paso 2: Crear Repositorios
1. Crear repositorio para cada subdominio
2. Configurar GitHub Pages
3. Agregar archivo CNAME correspondiente

### Paso 3: Configurar Aplicaciones
1. Actualizar URLs en configuraciones
2. Configurar CORS para subdominios
3. Actualizar enlaces entre aplicaciones

### Paso 4: Testing
1. Verificar funcionamiento de cada subdominio
2. Probar navegación entre subdominios
3. Validar certificados SSL

## URLs Finales

- https://www.novastreamteam.com - Landing page
- https://app.novastreamteam.com - Aplicación principal
- https://api.novastreamteam.com - Backend API
- https://docs.novastreamteam.com - Documentación
- https://demo.novastreamteam.com - Demo funcional
- https://admin.novastreamteam.com - Panel admin

## Configuración de Desarrollo

### Variables de Entorno por Subdominio

**app.novastreamteam.com:**
```env
VITE_API_URL=https://api.novastreamteam.com
VITE_CDN_URL=https://cdn.novastreamteam.com
VITE_DOCS_URL=https://docs.novastreamteam.com
```

**Backend (api.novastreamteam.com):**
```env
FRONTEND_URL=https://app.novastreamteam.com
ADMIN_URL=https://admin.novastreamteam.com
CORS_ORIGINS=https://app.novastreamteam.com,https://admin.novastreamteam.com
```