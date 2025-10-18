#!/bin/bash

echo "Instalando dependencias para LA MEJOR RED SOCIAL DEL MUNDO..."
echo

echo "1. Instalando dependencias del backend..."
cd backend
npm install express-rate-limit helmet compression node-cron
cd ..

echo
echo "2. Instalando dependencias del frontend..."
cd frontend
npm install framer-motion react-intersection-observer react-hot-toast react-dropzone workbox-window
cd ..

echo
echo "✅ Todas las dependencias instaladas!"
echo
echo "🚀 Funcionalidades agregadas:"
echo "- ✅ Historias (Stories) como Instagram"
echo "- ✅ Notificaciones en tiempo real"
echo "- ✅ Sistema de logros y gamificación"
echo "- ✅ Modo oscuro/claro"
echo "- ✅ Múltiples idiomas (ES/EN)"
echo "- ✅ Leaderboard de usuarios"
echo "- ✅ Animaciones avanzadas"
echo "- ✅ Seguridad mejorada"
echo
echo "Para iniciar: ./dev.sh"