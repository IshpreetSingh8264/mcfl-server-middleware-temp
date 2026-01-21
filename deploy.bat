@echo off
echo Starting Deployment...

:: Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running or not installed.
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Docker is running. Proceeding with build and deployment...

:: Pull latest images if needed (optional, good for base images)
:: docker-compose pull

:: Build and start the containers
docker-compose up --build -d

if %errorlevel% neq 0 (
    echo.
    echo Deployment Failed!
    pause
    exit /b 1
)

echo.
echo Deployment Successful!
echo Server should be running on http://localhost:3000
pause
