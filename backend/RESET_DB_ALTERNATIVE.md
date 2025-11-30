# 🗄️ Alternative Ways to Reset Database

Since `psql` command is not available, here are alternative methods:

## Method 1: Using pgAdmin (Recommended - Easiest)

1. **Open pgAdmin 4** (from Windows Start menu)

2. **Connect to Server:**
   - Enter your PostgreSQL password if asked

3. **Drop Database:**
   - Expand "Databases" in the left panel
   - Right-click on `mechanic_assist` (if it exists)
   - Click "Delete/Drop"
   - Check "Yes" to confirm

4. **Create Database:**
   - Right-click on "Databases" → Create → Database
   - Name: `mechanic_assist`
   - Click "Save"

5. **Run Django Migrations:**
   ```powershell
   cd backend
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

## Method 2: Using SQL Shell from Start Menu

1. **Open "SQL Shell (psql)"** from Windows Start Menu
   - Just search for "SQL Shell" or "psql"

2. **Press Enter for default values:**
   - Server [localhost]: (Press Enter)
   - Database [postgres]: (Press Enter)
   - Port [5432]: (Press Enter)
   - Username [postgres]: (Press Enter)
   - Password: (Type your password, Press Enter)

3. **Run these SQL commands:**
   ```sql
   DROP DATABASE IF EXISTS mechanic_assist;
   CREATE DATABASE mechanic_assist;
   \q
   ```

4. **Run Django Migrations:**
   ```powershell
   cd backend
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

## Method 3: Find Full Path to psql

1. **Check your PostgreSQL version:**
   ```powershell
   Get-ChildItem "C:\Program Files\PostgreSQL" -ErrorAction SilentlyContinue
   ```

2. **Use full path (replace VERSION with your version number):**
   ```powershell
   & "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
   ```

   Or try:
   ```powershell
   & "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
   ```

   Or:
   ```powershell
   & "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
   ```

3. **Then run SQL:**
   ```sql
   DROP DATABASE mechanic_assist;
   CREATE DATABASE mechanic_assist;
   \q
   ```

---

## Method 4: Skip Database Reset - Just Run Migrations

If you want to try without resetting (might work if database is empty):

```powershell
cd backend
python manage.py migrate --run-syncdb
```

Or try fake migrations:

```powershell
python manage.py migrate accounts --fake-initial
python manage.py migrate
```

---

## ⭐ I Recommend: Use pgAdmin (Method 1)

It's the easiest and most user-friendly way!

