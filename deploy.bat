@echo off
echo 🚀 Desplegando NovaStream...

REM Construir el frontend para producción
echo 📦 Construyendo frontend...
cd frontend
call npm run build
cd ..

REM Copiar archivos de build al directorio raíz para GitHub Pages
echo 📋 Copiando archivos para GitHub Pages...
xcopy /E /Y frontend\dist\* .
copy frontend\dist\index.html app.html

REM Commit y push
echo 📤 Subiendo cambios a GitHub...
git add .
git commit -m "Deploy: Actualizar aplicación web y configuración de producción"
git push origin main

echo ✅ Despliegue completado!
echo 🌐 Tu sitio estará disponible en: https://novastreamteam.com
echo 📱 Para la app móvil, actualiza la IP en mobile-app/src/config/api.js
pause