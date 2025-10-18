#!/bin/bash

echo "Iniciando Red Social en modo desarrollo..."
echo

echo "Instalando dependencias..."
cd backend && npm install
cd ../frontend && npm install
cd ..

echo
echo "Iniciando backend..."
cd backend
npm run dev &
BACKEND_PID=$!

cd ../frontend
echo "Iniciando frontend..."
npm run dev &
FRONTEND_PID=$!

echo
echo "✅ Red Social iniciada!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo
echo "Presiona Ctrl+C para detener..."

# Esperar a que el usuario presione Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait