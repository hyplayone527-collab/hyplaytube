@echo off
echo Actualizando URLs de localhost:5000 a localhost:5001...

powershell -Command "(Get-Content 'frontend/src/context/AuthContext.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/context/AuthContext.jsx'"
powershell -Command "(Get-Content 'frontend/src/components/Stories.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/components/Stories.jsx'"
powershell -Command "(Get-Content 'frontend/src/components/PostForm.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/components/PostForm.jsx'"
powershell -Command "(Get-Content 'frontend/src/components/PostCard.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/components/PostCard.jsx'"
powershell -Command "(Get-Content 'frontend/src/components/Notifications.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/components/Notifications.jsx'"
powershell -Command "(Get-Content 'frontend/src/components/Achievements.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/components/Achievements.jsx'"
powershell -Command "(Get-Content 'frontend/src/pages/Home.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/pages/Home.jsx'"
powershell -Command "(Get-Content 'frontend/src/pages/Profile.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/pages/Profile.jsx'"
powershell -Command "(Get-Content 'frontend/src/pages/Chat.jsx') -replace 'localhost:5000', 'localhost:5001' | Set-Content 'frontend/src/pages/Chat.jsx'"

echo ✅ URLs actualizadas a puerto 5001
echo Ahora ejecutando la aplicación...
pause