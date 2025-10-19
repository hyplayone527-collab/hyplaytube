# Configuración DNS para novastreamteam.com

## Registros DNS necesarios:

### Para GitHub Pages:
```
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

Tipo: CNAME
Nombre: www
Valor: hyplayone527-collab.github.io
TTL: 3600
```

### Para Netlify (alternativa):
```
Tipo: CNAME
Nombre: @
Valor: hyplayone527-collab.netlify.app
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: hyplayone527-collab.netlify.app
TTL: 3600
```

## Pasos para configurar:

1. Ve al panel de control de tu proveedor de dominio
2. Busca la sección "DNS" o "Gestión de DNS"
3. Añade los registros DNS según la plataforma elegida
4. Espera 24-48 horas para la propagación completa
5. Verifica en GitHub Pages o Netlify que el dominio esté conectado

## Verificación:
- GitHub Pages: Settings > Pages > Custom domain
- Netlify: Site settings > Domain management > Custom domains