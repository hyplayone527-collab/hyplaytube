# 🌐 Configuración Específica para www.novastreamteam.com

## Configuración DNS Correcta

### Registros DNS necesarios en tu proveedor:

```
Tipo    Nombre    Destino                           TTL
CNAME   www       hyplayone527-collab.github.io    3600
CNAME   @         www.novastreamteam.com            3600
CNAME   app       hyplayone527-collab.github.io    3600
CNAME   docs      hyplayone527-collab.github.io    3600
CNAME   demo      hyplayone527-collab.github.io    3600
CNAME   admin     hyplayone527-collab.github.io    3600
```

## Configuración GitHub Pages

### Repositorio Principal (hyplayone527-collab/hyplaytube)
1. **Settings** → **Pages**
2. **Custom domain**: `www.novastreamteam.com`
3. **Enforce HTTPS**: ✅ Activado
4. **Archivo CNAME**: Debe contener `www.novastreamteam.com`

### Verificación
- ✅ GitHub detecta el dominio correctamente
- ✅ Certificado SSL se genera automáticamente
- ✅ Redirección HTTP → HTTPS funciona

## Redirecciones Automáticas

### GitHub Pages automáticamente redirige:
- `novastreamteam.com` → `www.novastreamteam.com`
- `http://www.novastreamteam.com` → `https://www.novastreamteam.com`

## Subdominios con www

### Estructura recomendada:
- **Principal**: `www.novastreamteam.com`
- **App**: `app.novastreamteam.com` (sin www)
- **Docs**: `docs.novastreamteam.com` (sin www)
- **Demo**: `demo.novastreamteam.com` (sin www)
- **API**: `api.novastreamteam.com` (sin www)

### ¿Por qué subdominios sin www?
- Más cortos y fáciles de recordar
- Estándar de la industria para subdominios
- Mejor para APIs y servicios

## Verificación de Configuración

### Comandos de prueba:
```bash
# Verificar dominio principal
curl -I https://www.novastreamteam.com

# Verificar redirección desde apex
curl -I https://novastreamteam.com

# Verificar subdominios
curl -I https://app.novastreamteam.com
curl -I https://demo.novastreamteam.com
```

### Herramientas online:
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://ssl-checker.online-domain-tools.com/

## Troubleshooting

### Problema: "www no funciona"
**Solución**: 
1. Verificar CNAME `www` apunta a `hyplayone527-collab.github.io`
2. Esperar propagación DNS (24-48h)
3. Verificar configuración en GitHub Pages

### Problema: "Subdominios no funcionan"
**Solución**:
1. Crear repositorios separados para cada subdominio
2. Configurar GitHub Pages en cada repositorio
3. Agregar archivo CNAME correspondiente

### Problema: "Certificado SSL no funciona"
**Solución**:
1. Remover custom domain en GitHub Pages
2. Esperar 24 horas
3. Volver a agregar custom domain
4. Activar "Enforce HTTPS"

## Configuración Avanzada

### Para mejor rendimiento:
1. **Cloudflare** como proxy DNS
2. **CDN** para archivos estáticos
3. **Compresión** automática
4. **Caché** optimizado

### Configuración Cloudflare (opcional):
```
Tipo    Nombre    Destino                           Proxy
CNAME   www       hyplayone527-collab.github.io    🟠 Proxied
CNAME   app       hyplayone527-collab.github.io    🟠 Proxied
CNAME   docs      hyplayone527-collab.github.io    🟠 Proxied
CNAME   demo      hyplayone527-collab.github.io    🟠 Proxied
```

## Monitoreo

### URLs a monitorear:
- https://www.novastreamteam.com
- https://app.novastreamteam.com
- https://docs.novastreamteam.com
- https://demo.novastreamteam.com

### Métricas importantes:
- Tiempo de respuesta < 2s
- Uptime > 99.9%
- Certificado SSL válido
- Redirecciones funcionando