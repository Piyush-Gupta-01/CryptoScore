@echo off
echo Starting CryptoScore Backend...
echo.

echo Checking if Maven is installed...
mvn --version
if %errorlevel% neq 0 (
    echo Maven is not installed or not in PATH
    echo Please install Maven and try again
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8082/api
echo H2 Console will be available at: http://localhost:8082/api/h2-console
echo.

mvn spring-boot:run

pause