@echo off
echo ========================================
echo   KUMASHKOV MASSAGE WEBSITE
echo   Local Development Server (Vite)
echo ========================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo npm не найден. Установите Node.js.
  pause
  exit /b 1
)

echo Installing dependencies (first run)...
call npm install

echo.
echo Starting dev server...
call npm run dev
