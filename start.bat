@echo off
echo Iniciando Red Social...
echo.

echo 1. Instalando dependencias del backend...
cd backend
call npm install
cd ..

echo.
echo 2. Instalando dependencias del frontend...
cd frontend
call npm install
cd ..

echo.
echo 3. Iniciando servicios con Docker...
docker-compose up -d

echo.
echo ✅ Red Social iniciada exitosamente!
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo 💾 Base de datos: JSON (archivo local)
echo.
echo Para detener los servicios: docker-compose down
pause