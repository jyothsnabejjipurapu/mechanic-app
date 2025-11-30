# 🗄️ PostgreSQL Database Setup Guide

## Step 1: Install PostgreSQL (if not already installed)

### Windows:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation, you'll be asked to set a password for the `postgres` user - **REMEMBER THIS PASSWORD!**
4. Complete the installation

### Verify Installation:
Open Command Prompt or PowerShell and run:
```bash
psql --version
```

## Step 2: Create the Database

### Option A: Using psql Command Line

1. **Open PostgreSQL Command Line:**
   - Press `Windows Key + R`
   - Type: `cmd` and press Enter
   - OR open PowerShell

2. **Connect to PostgreSQL:**
   ```bash
   psql -U postgres
   ```
   - It will ask for the password you set during installation
   - Enter the password

3. **Create the Database:**
   ```sql
   CREATE DATABASE mechanic_assist;
   ```

4. **Verify the database was created:**
   ```sql
   \l
   ```
   You should see `mechanic_assist` in the list

5. **Exit psql:**
   ```sql
   \q
   ```

### Option B: Using pgAdmin (GUI Tool)

1. Open **pgAdmin** (installed with PostgreSQL)
2. Connect to your PostgreSQL server (enter password if asked)
3. Right-click on **Databases** → **Create** → **Database**
4. Enter database name: `mechanic_assist`
5. Click **Save**

## Step 3: Configure Database Settings

### Create `.env` file in the `backend` directory:

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create `.env` file** (copy the template below):

### `.env` file content:

```env
# Django Secret Key (generate a new one for production)
SECRET_KEY=your-super-secret-key-change-this-in-production-12345

# Debug Mode (set to False in production)
DEBUG=True

# Allowed Hosts (comma-separated)
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
# Replace 'your-postgres-password' with the password you set during PostgreSQL installation
DB_NAME=mechanic_assist
DB_USER=postgres
DB_PASSWORD=your-postgres-password
DB_HOST=localhost
DB_PORT=5432

# Pricing Configuration
BASE_FARE=100
PER_KM_RATE=10
```

### 📝 IMPORTANT: Replace these values:

1. **SECRET_KEY**: 
   - For development: You can use any random string
   - For production: Generate a secure key using:
     ```python
     python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
     ```

2. **DB_PASSWORD**: 
   - Replace `your-postgres-password` with the password you set during PostgreSQL installation
   - **Example:** If your password is `mypassword123`, change it to:
     ```env
     DB_PASSWORD=mypassword123
     ```

3. **DB_USER**: 
   - Default is `postgres` (usually fine)
   - If you created a different user, change it here

4. **DB_NAME**: 
   - Already set to `mechanic_assist` (matches the database we created)
   - Don't change this unless you named your database differently

## Step 4: Run Django Migrations

After setting up the database and `.env` file:

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment** (if you created one):
   ```bash
   # Windows PowerShell:
   .\venv\Scripts\Activate.ps1
   
   # Windows CMD:
   venv\Scripts\activate.bat
   ```

3. **Install dependencies** (if not already done):
   ```bash
   pip install -r requirements.txt
   ```

4. **Create migrations:**
   ```bash
   python manage.py makemigrations
   ```

5. **Apply migrations to create tables:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (admin account):**
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create an admin account

## Step 5: Verify Database Connection

Run the Django server:
```bash
python manage.py runserver
```

If it starts without errors, your database is connected successfully! ✅

## Troubleshooting

### Error: "password authentication failed"
- **Solution**: Check your `.env` file - make sure `DB_PASSWORD` matches your PostgreSQL password

### Error: "database does not exist"
- **Solution**: Make sure you created the database with name `mechanic_assist` (or update `DB_NAME` in `.env`)

### Error: "could not connect to server"
- **Solution**: 
  1. Make sure PostgreSQL service is running
  2. Check `DB_HOST` is `localhost`
  3. Check `DB_PORT` is `5432` (default PostgreSQL port)

### Can't find psql command
- **Solution**: Add PostgreSQL bin directory to your PATH, or use full path:
  ```bash
  "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
  ```
  (Replace `15` with your PostgreSQL version)

## Quick Setup Checklist

- [ ] PostgreSQL installed
- [ ] Database `mechanic_assist` created
- [ ] `.env` file created in `backend/` directory
- [ ] Password updated in `.env` file
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Migrations created (`python manage.py makemigrations`)
- [ ] Migrations applied (`python manage.py migrate`)
- [ ] Superuser created (`python manage.py createsuperuser`)
- [ ] Server runs successfully (`python manage.py runserver`)

---

**Need Help?** If you encounter any issues, check:
1. PostgreSQL service is running (Windows Services)
2. All values in `.env` file are correct
3. Database name matches in both PostgreSQL and `.env` file

