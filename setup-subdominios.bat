@echo off
echo 🌐 Configurando subdominios para NovaStream...

REM Crear directorios para cada subdominio
echo 📁 Creando estructura de directorios...
mkdir subdominios\app 2>nul
mkdir subdominios\docs 2>nul
mkdir subdominios\demo 2>nul
mkdir subdominios\admin 2>nul

REM Copiar archivos a subdominios
echo 📋 Copiando archivos...

REM App subdominio
copy app.html subdominios\app\index.html
xcopy /E /Y assets subdominios\app\assets\
echo app.novastreamteam.com > subdominios\app\CNAME

REM Docs subdominio
copy docs.html subdominios\docs\index.html
echo docs.novastreamteam.com > subdominios\docs\CNAME

REM Demo subdominio
copy demo.html subdominios\demo\index.html
echo demo.novastreamteam.com > subdominios\demo\CNAME

REM Admin subdominio (crear página básica)
echo ^<!DOCTYPE html^> > subdominios\admin\index.html
echo ^<html^>^<head^>^<title^>NovaStream Admin^</title^>^</head^> >> subdominios\admin\index.html
echo ^<body^>^<h1^>Panel de Administración NovaStream^</h1^>^<p^>Próximamente...^</p^>^</body^>^</html^> >> subdominios\admin\index.html
echo admin.novastreamteam.com > subdominios\admin\CNAME

echo ✅ Subdominios configurados correctamente!
echo.
echo 📋 Próximos pasos:
echo 1. Configurar registros CNAME en tu proveedor de dominio
echo 2. Crear repositorios separados para cada subdominio
echo 3. Configurar GitHub Pages para cada repositorio
echo.
echo 🌐 Subdominios creados:
echo - www.novastreamteam.com (Página principal)
echo - app.novastreamteam.com (Aplicación principal)
echo - docs.novastreamteam.com (Documentación)
echo - demo.novastreamteam.com (Demo funcional)
echo - admin.novastreamteam.com (Panel admin)
echo.
pause