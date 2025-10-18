#!/bin/bash

echo "🚀 Desplegando NovaStream..."

# Construir el frontend para producción
echo "📦 Construyendo frontend..."
cd frontend
npm run build
cd ..

# Copiar archivos de build al directorio raíz para GitHub Pages
echo "📋 Copiando archivos para GitHub Pages..."
cp -r frontend/dist/* .
cp frontend/dist/index.html ./app.html

# Actualizar el index.html principal para incluir enlace a la app
echo "🔗 Actualizando página principal..."

# Commit y push
echo "📤 Subiendo cambios a GitHub..."
git add .
git commit -m "Deploy: Actualizar aplicación web y configuración de producción"
git push origin main

echo "✅ Despliegue completado!"
echo "🌐 Tu sitio estará disponible en: https://novastreamteam.com"
echo "📱 Para la app móvil, actualiza la IP en mobile-app/src/config/api.js"