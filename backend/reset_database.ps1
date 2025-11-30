# Reset Database Script for PostgreSQL 18
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Database Reset Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

Write-Host "Connecting to PostgreSQL..." -ForegroundColor Yellow
Write-Host "You will be prompted for your PostgreSQL password" -ForegroundColor Yellow
Write-Host ""

# Drop and recreate database
& $psqlPath -U postgres -c "DROP DATABASE IF EXISTS mechanic_assist;"
& $psqlPath -U postgres -c "CREATE DATABASE mechanic_assist;"

Write-Host ""
Write-Host "Database reset complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Now run these commands:" -ForegroundColor Yellow
Write-Host "  python manage.py migrate" -ForegroundColor White
Write-Host "  python manage.py createsuperuser" -ForegroundColor White

