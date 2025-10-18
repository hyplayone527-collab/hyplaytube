@echo off
echo 🚀 DESPLIEGUE COMPLETO DE NOVASTREAM
echo =====================================
echo.

echo 📦 Paso 1: Construyendo aplicación React...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Error al construir el frontend
    pause
    exit /b 1
)
cd ..

echo 📋 Paso 2: Copiando archivos al directorio raíz...
copy frontend\dist\index.html app.html
copy frontend\dist\404.html 404.html 2>nul
xcopy /E /Y frontend\dist\assets assets\ >nul 2>&1

echo 🔧 Paso 3: Actualizando rutas en app.html...
powershell -Command "(Get-Content app.html) -replace '/assets/', './assets/' | Set-Content app.html"

echo 📱 Paso 4: Verificando configuración móvil...
if not exist mobile-app\src\config\api.js (
    echo ⚠️  Archivo de configuración móvil no encontrado
) else (
    echo ✅ Configuración móvil OK
)

echo 🌐 Paso 5: Verificando archivos web...
if exist demo.html (echo ✅ Demo funcional OK) else (echo ❌ Demo no encontrado)
if exist docs.html (echo ✅ Documentación OK) else (echo ❌ Docs no encontradas)
if exist index.html (echo ✅ Página principal OK) else (echo ❌ Index no encontrado)
if exist app.html (echo ✅ Aplicación React OK) else (echo ❌ App no encontrada)

echo 📤 Paso 6: Subiendo a GitHub...
git add .
git commit -m "🚀 Despliegue completo de NovaStream - Todas las funcionalidades"
git push origin main

echo.
echo ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE!
echo.
echo 🌐 Tu plataforma NovaStream está disponible en:
echo - https://www.novastreamteam.com (Página principal)
echo - https://www.novastreamteam.com/demo.html (Demo funcional)
echo - https://www.novastreamteam.com/app.html (Aplicación completa)
echo - https://www.novastreamteam.com/docs.html (Documentación)
echo.
echo 📱 Para la app móvil:
echo 1. Actualiza tu IP en mobile-app/src/config/api.js
echo 2. Ejecuta: cd mobile-app && npm start
echo.
echo 🔧 Para el backend:
echo 1. Despliega en Render.com usando render.yaml
echo 2. URL del backend: https://novastream-backend.onrender.com
echo.
pause