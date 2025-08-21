@echo off
echo Starting CryptoScore Application...
echo.

echo Installing frontend dependencies...
call npm install

echo.
echo Starting frontend development server...
start cmd /k "npm run dev"

echo.
echo Frontend will be available at: http://localhost:3000
echo.

echo To start the backend:
echo 1. Open a new terminal
echo 2. Navigate to the backend directory: cd backend
echo 3. Run: mvn spring-boot:run
echo 4. Backend will be available at: http://localhost:8080/api
echo.

pause