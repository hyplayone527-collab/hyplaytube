# 🌐 Configuración de Subdominios NovaStream

## Estructura de Dominios

### Dominio Principal
- **URL**: `novastreamteam.com`
- **Contenido**: Landing page informativa
- **Archivo**: `landing.html` (renombrar a `index.html` para producción)
- **CNAME**: `novastreamteam.com`

### Subdominio de Aplicación
- **URL**: `app.novastreamteam.com`
- **Contenido**: Aplicación completa NovaStream
- **Carpeta**: `/app/`
- **CNAME**: `app/CNAME` con contenido `app.novastreamteam.com`

## 📋 Pasos para Configurar

### 1. Configurar DNS en DonWeb

Agregar estos registros DNS:

```
# Dominio principal (GitHub Pages)
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

# Subdominio www
Tipo: CNAME
Nombre: www
Valor: novastreamteam.com

# Subdominio app (aplicación completa)
Tipo: CNAME
Nombre: app
Valor: hyplayone527-collab.github.io
```

### 2. Configurar GitHub Pages

#### Para el dominio principal:
1. Ve a: https://github.com/hyplayone527-collab/hyplaytube/settings/pages
2. En "Custom domain" ingresa: `novastreamteam.com`
3. Marca "Enforce HTTPS"
4. Asegúrate que el archivo `CNAME` en la raíz contenga: `novastreamteam.com`
ado (
#### Para el subdominio app:
**Opción A: Repositorio separRecomendado)**
1. Crear nuevo repositorio: `novastream-app`
2. Subir contenido de la carpeta `/app/`
3. Configurar GitHub Pages con dominio: `app.novastreamteam.com`
4. El archivo `CNAME` debe contener: `app.novastreamteam.com`

**Opción B: Mismo repositorio con carpetas**
1. Mantener carpeta `/app/` en el repositorio actual
2. GitHub Pages servirá automáticamente: `novastreamteam.com/app/`
3. Configurar redirección de `app.novastreamteam.com` → `novastreamteam.com/app/`

### 3. Estructura de Archivos

```
/
├── CNAME                    # novastreamteam.com
├── index.html              # Landing page (renombrar landing.html)
├── landing.html            # Backup de landing
├── app-completa.html       # App antigua (mantener como backup)
├── /app/                   # Subdominio app
│   ├── CNAME              # app.novastreamteam.com
│   ├── index.html         # Aplicación completa
│   └── app.js             # JavaScript de la app
├── /frontend/             # Build de React
└── /assets/               # Recursos estáticos
```

### 4. Configuración de Redirección

El archivo `index.html` principal está configurado para:
1. **Redirección META**: `<meta http-equiv="refresh" content="0; url=https://app.novastreamteam.com">`
2. **Redirección JavaScript**: Como respaldo después de 1 segundo
3. **Enlace manual**: Por si las redirecciones automáticas fallan

### 5. Desplegar Cambios

```bash
# Commit y push
git add .
git commit -m "Configurar redirección automática a app.novastreamteam.com"
git push origin main
```

### 5. Verificar Configuración

Después de 10-15 minutos, verificar:

```bash
# Verificar dominio principal
ping novastreamteam.com
curl -I https://novastreamteam.com

# Verificar subdominio app
ping app.novastreamteam.com
curl -I https://app.novastreamteam.com

# Verificar registros DNS
nslookup novastreamteam.com
nslookup app.novastreamteam.com
```

## 🔗 URLs Finales

- **Dominio Principal**: https://novastreamteam.com (redirige automáticamente)
- **App Completa**: https://app.novastreamteam.com
- **Landing Estática**: https://novastreamteam.com/landing.html (opcional)
- **Backend API**: https://novastream-backend.onrender.com/api
- **Repositorio**: https://github.com/hyplayone527-collab/hyplaytube

## ⚠️ Notas Importantes

1. **Propagación DNS**: Puede tomar 2-24 horas
2. **HTTPS**: GitHub Pages lo habilita automáticamente después de verificar el dominio
3. **CNAME**: Cada dominio/subdominio necesita su propio archivo CNAME
4. **Redirecciones**: www.novastreamteam.com redirige automáticamente a novastreamteam.com

## 🐛 Solución de Problemas

### El subdominio no funciona
- Verificar que el registro CNAME en DNS apunte a `hyplayone527-collab.github.io`
- Verificar que el archivo `app/CNAME` contenga `app.novastreamteam.com`
- Esperar propagación DNS (hasta 24 horas)

### Error 404 en el subdominio
- Verificar que la carpeta `/app/` tenga un archivo `index.html`
- Verificar configuración de GitHub Pages
- Limpiar caché del navegador

### HTTPS no funciona
- Esperar a que GitHub Pages verifique el dominio
- Puede tomar hasta 24 horas después de configurar DNS
- Verificar que "Enforce HTTPS" esté marcado en GitHub Pages
