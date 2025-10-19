@echo off
echo 🔧 ACTUALIZAR URL DEL BACKEND DESPLEGADO
echo ========================================
echo.

set /p BACKEND_URL="Ingresa la URL de tu backend en Render (ej: https://novastream-backend.onrender.com): "

if "%BACKEND_URL%"=="" (
    echo ❌ Error: Debes ingresar una URL
    pause
    exit /b 1
)

echo.
echo 📝 Actualizando configuraciones...

REM Actualizar frontend config
echo Actualizando frontend/src/config/api.js...
powershell -Command "(Get-Content 'frontend/src/config/api.js') -replace 'https://novastream-backend.onrender.com', '%BACKEND_URL%' | Set-Content 'frontend/src/config/api.js'"

REM Actualizar mobile config
echo Actualizando mobile-app/src/config/api.js...
powershell -Command "(Get-Content 'mobile-app/src/config/api.js') -replace 'https://novastream-backend.onrender.com', '%BACKEND_URL%' | Set-Content 'mobile-app/src/config/api.js'"

REM Reconstruir frontend
echo.
echo 📦 Reconstruyendo frontend...
cd frontend
call npm run build
cd ..

REM Actualizar app.html
echo 📋 Actualizando app.html...
copy frontend\dist\index.html app.html
powershell -Command "(Get-Content app.html) -replace '/assets/', './assets/' | Set-Content app.html"

REM Subir cambios
echo.
echo 📤 Subiendo cambios a GitHub...
git add .
git commit -m "🔧 Actualizar URL del backend desplegado: %BACKEND_URL%"
git push origin main

echo.
echo ✅ CONFIGURACIÓN ACTUALIZADA!
echo.
echo 🌐 URLs actualizadas:
echo - Frontend: https://www.novastreamteam.com
echo - Backend: %BACKEND_URL%
echo - API Health: %BACKEND_URL%/api/health
echo.
echo 📱 Para la app móvil:
echo 1. Actualiza tu IP local en mobile-app/src/config/api.js
echo 2. Ejecuta: cd mobile-app && npm start
echo.
pause