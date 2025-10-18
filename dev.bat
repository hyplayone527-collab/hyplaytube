@echo off
echo Iniciando Red Social en modo desarrollo...
echo.

echo Instalando dependencias...
cd backend
call npm install
cd ../frontend
call npm install
cd ..

echo.
echo Iniciando backend...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Iniciando frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Red Social iniciada!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:5000
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul