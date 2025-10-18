@echo off
echo 🚀 Desplegando NovaStream con subdominios...

REM Ejecutar configuración de subdominios
call setup-subdominios.bat

echo.
echo 📤 Subiendo cambios a GitHub...

REM Agregar todos los archivos
git add .

REM Commit con mensaje descriptivo
git commit -m "Configurar subdominios para NovaStream: app, docs, demo, admin"

REM Push a GitHub
git push origin main

echo.
echo ✅ Despliegue completado!
echo.
echo 🌐 URLs de tu plataforma NovaStream:
echo - https://novastreamteam.com (Página principal)
echo - https://app.novastreamteam.com (Aplicación web)
echo - https://docs.novastreamteam.com (Documentación)
echo - https://demo.novastreamteam.com (Demo funcional)
echo - https://admin.novastreamteam.com (Panel admin)
echo.
echo 📋 Próximos pasos para activar subdominios:
echo.
echo 1. 🌐 Configurar DNS en tu proveedor de dominio:
echo    - Agregar CNAME: app → novastreamteam.github.io
echo    - Agregar CNAME: docs → novastreamteam.github.io
echo    - Agregar CNAME: demo → novastreamteam.github.io
echo    - Agregar CNAME: admin → novastreamteam.github.io
echo.
echo 2. 📁 Crear repositorios separados (opcional pero recomendado):
echo    - novastreamteam/app
echo    - novastreamteam/docs
echo    - novastreamteam/demo
echo    - novastreamteam/admin
echo.
echo 3. ⚙️ Configurar GitHub Pages para cada repositorio
echo.
echo 4. 🔧 Configurar backend en Render/Railway:
echo    - URL: api.novastreamteam.com
echo    - Variables de entorno actualizadas
echo.
pause