# 🌐 Configuración DNS para Subdominios NovaStream

## Registros DNS Necesarios

### En tu proveedor de dominio (donde compraste novastreamteam.com):

```
Tipo    Nombre    Destino                      TTL
CNAME   www       hyplayone527-collab.github.io  3600
CNAME   @         www.novastreamteam.com       3600
CNAME   app       hyplayone527-collab.github.io  3600
CNAME   docs      hyplayone527-collab.github.io  3600
CNAME   demo      hyplayone527-collab.github.io  3600
CNAME   admin     hyplayone527-collab.github.io  3600
CNAME   api       novastream-api.onrender.com  3600
```

## Proveedores Populares

### Namecheap
1. Ir a Domain List → Manage
2. Advanced DNS → Add New Record
3. Agregar cada registro CNAME

### GoDaddy
1. Ir a My Products → DNS
2. Add → CNAME
3. Configurar cada subdominio

### Cloudflare
1. DNS → Records
2. Add record → CNAME
3. Configurar subdominios

### Google Domains
1. DNS → Custom records
2. Create new record → CNAME
3. Agregar subdominios

## Verificación

### Comandos para verificar DNS:
```bash
# Verificar dominio principal
nslookup www.novastreamteam.com

# Verificar subdominios
nslookup app.novastreamteam.com
nslookup docs.novastreamteam.com
nslookup demo.novastreamteam.com
nslookup admin.novastreamteam.com
nslookup api.novastreamteam.com
```

### Herramientas online:
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://mxtoolbox.com/

## Tiempos de Propagación

- **Cambios CNAME**: 1-4 horas
- **Cambios A**: 4-24 horas
- **Propagación global**: 24-48 horas

## Configuración GitHub Pages

### Para cada subdominio:

1. **Crear repositorio** (opcional):
   - `novastreamteam/app`
   - `novastreamteam/docs` 
   - `novastreamteam/demo`
   - `novastreamteam/admin`

2. **Configurar GitHub Pages**:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main
   - Custom domain: subdominio.novastreamteam.com

3. **Agregar archivo CNAME**:
   ```
   app.novastreamteam.com
   ```

## SSL/HTTPS

GitHub Pages automáticamente:
- ✅ Genera certificados SSL
- ✅ Redirige HTTP → HTTPS
- ✅ Renovación automática

## Troubleshooting

### Problema: "Domain's DNS record could not be retrieved"
**Solución**: Esperar propagación DNS (24-48h)

### Problema: "Domain does not resolve to GitHub Pages"
**Solución**: Verificar registros CNAME en DNS

### Problema: "Certificate provisioning failed"
**Solución**: 
1. Remover custom domain
2. Esperar 24h
3. Volver a agregar custom domain

### Problema: Subdominio no carga
**Solución**:
1. Verificar archivo CNAME en repositorio
2. Verificar configuración DNS
3. Limpiar caché del navegador

## Monitoreo

### Herramientas recomendadas:
- **UptimeRobot**: Monitoreo de disponibilidad
- **Pingdom**: Monitoreo de rendimiento
- **StatusPage**: Página de estado público

### Métricas importantes:
- Tiempo de respuesta
- Disponibilidad (uptime)
- Tiempo de carga
- Errores SSL

## Backup y Recuperación

### Configuración de respaldo:
1. Documentar configuración DNS actual
2. Exportar registros DNS
3. Mantener copia de archivos CNAME
4. Backup de repositorios GitHub

### Plan de recuperación:
1. Restaurar registros DNS
2. Reconfigurar GitHub Pages
3. Verificar certificados SSL
4. Probar todos los subdominios