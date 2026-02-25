@echo off
echo ========================================
echo   Iniciando EduControl - Full Stack
echo ========================================
echo.

echo [1/4] Verificando MySQL...
mysql -u root -e "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MySQL no esta corriendo. Por favor inicia MySQL primero.
    pause
    exit /b 1
)
echo MySQL OK

echo.
echo [2/4] Verificando base de datos...
mysql -u root -e "USE clasesparticulares" >nul 2>&1
if %errorlevel% neq 0 (
    echo Base de datos no encontrada. Creando...
    mysql -u root < database.sql
    if %errorlevel% neq 0 (
        echo ERROR: No se pudo crear la base de datos.
        echo Por favor ejecuta manualmente: mysql -u root -p ^< database.sql
        pause
        exit /b 1
    )
    echo Base de datos creada correctamente
) else (
    echo Base de datos OK
)

echo.
echo [3/4] Iniciando Backend (Puerto 3000)...
start "Backend - EduControl" cmd /k "cd Backend && npm run dev"
timeout /t 3 >nul

echo.
echo [4/4] Iniciando Frontend (Puerto 5173)...
start "Frontend - EduControl" cmd /k "cd Frontend && npm run dev"

echo.
echo ========================================
echo   Aplicacion iniciada correctamente
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:3000/docs
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
