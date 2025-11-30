@echo off
echo ========================================
echo   Fixing Database Migration Error
echo ========================================
echo.
echo Step 1: Resetting database...
echo Please run these PostgreSQL commands:
echo   psql -U postgres
echo   DROP DATABASE mechanic_assist;
echo   CREATE DATABASE mechanic_assist;
echo   \q
echo.
echo Press any key after you've reset the database...
pause
echo.
echo Step 2: Running migrations...
python manage.py migrate
echo.
echo Step 3: Creating superuser...
python manage.py createsuperuser
echo.
echo Done! Your database is now set up correctly.
pause

