# Quick Database Setup Guide

## ✅ YES - You Need to Create a PostgreSQL Database

## Step-by-Step Commands

### 1. Create Database Using Command Line

**Open PowerShell or Command Prompt and run:**

```bash
# Connect to PostgreSQL (it will ask for password)
psql -U postgres

# Once connected, run these SQL commands:
CREATE DATABASE mechanic_assist;

# Verify it was created
\l

# Exit PostgreSQL
\q
```

### 2. Configure Database Connection

**Create a file named `.env` in the `backend` folder:**

Location: `backend/.env`

**Copy this template and REPLACE the password:**

```env
SECRET_KEY=django-insecure-change-this-in-production-12345
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=mechanic_assist
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
DB_HOST=localhost
DB_PORT=5432
BASE_FARE=100
PER_KM_RATE=10
```

### 🔑 WHERE TO REPLACE PASSWORD:

**In the `.env` file, find this line:**
```env
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
```

**Replace `YOUR_POSTGRES_PASSWORD_HERE` with your actual PostgreSQL password**

**Example:**
```env
DB_PASSWORD=mypassword123
```

### 3. Run Django Setup Commands

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## 📍 Important File Locations

- **Database Config File:** `backend/mechanic_assist/settings.py` (already configured, reads from .env)
- **Environment Variables:** `backend/.env` (YOU NEED TO CREATE THIS)
- **Database Name:** `mechanic_assist` (created in Step 1)

## ⚠️ Common Issues

1. **"password authentication failed"**
   → Check `.env` file password matches your PostgreSQL password

2. **"database does not exist"**
   → Make sure you created the database: `CREATE DATABASE mechanic_assist;`

3. **"could not connect to server"**
   → Make sure PostgreSQL service is running in Windows Services

