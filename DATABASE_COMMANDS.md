# 🗄️ Database Setup - Exact Commands

## ✅ YES, You Need to Create a Database!

---

## 📝 STEP 1: Create PostgreSQL Database

**Open PowerShell/Command Prompt and paste these commands one by one:**

```bash
# Connect to PostgreSQL (enter your PostgreSQL password when asked)
psql -U postgres
```

**After connecting, paste these SQL commands:**

```sql
CREATE DATABASE mechanic_assist;
\l
\q
```

**What this does:**
- `CREATE DATABASE mechanic_assist;` → Creates the database
- `\l` → Lists all databases (to verify it was created)
- `\q` → Exits PostgreSQL

---

## 📝 STEP 2: Create `.env` File

**Location:** Create file at `backend/.env`

**Steps:**
1. Navigate to `backend` folder
2. Create a new file named `.env` (no extension, just `.env`)
3. Copy and paste this content:

```env
SECRET_KEY=django-insecure-change-this-12345
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=mechanic_assist
DB_USER=postgres
DB_PASSWORD=REPLACE_WITH_YOUR_POSTGRES_PASSWORD
DB_HOST=localhost
DB_PORT=5432
BASE_FARE=100
PER_KM_RATE=10
```

---

## 🔑 WHERE TO REPLACE PASSWORD

**In the `.env` file you just created:**

Find this line:
```env
DB_PASSWORD=REPLACE_WITH_YOUR_POSTGRES_PASSWORD
```

**Replace `REPLACE_WITH_YOUR_POSTGRES_PASSWORD` with your actual PostgreSQL password**

**Example:**
- If your PostgreSQL password is `abc123`, change it to:
```env
DB_PASSWORD=abc123
```

---

## 📝 STEP 3: Install Dependencies & Setup Django

**Run these commands in PowerShell (from the `backend` folder):**

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

**When you run `createsuperuser`, it will ask:**
- Email: (enter your email)
- Password: (enter a password for admin)
- Password (again): (enter again)

---

## 📝 STEP 4: Test the Connection

```bash
python manage.py runserver
```

**If you see:**
```
Starting development server at http://127.0.0.1:8000/
```

**✅ Database is connected successfully!**

---

## 📍 File Structure

```
Mechanic app/
└── backend/
    ├── .env                    ← CREATE THIS FILE HERE
    ├── mechanic_assist/
    │   └── settings.py        ← Already configured (reads from .env)
    └── manage.py
```

---

## ❌ Troubleshooting

### Error: "psql: command not found"
**Solution:** PostgreSQL might not be in PATH. Try:
```bash
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
```
(Replace `15` with your PostgreSQL version number)

### Error: "password authentication failed"
**Solution:** 
1. Check `.env` file exists in `backend/` folder
2. Make sure `DB_PASSWORD=` matches your PostgreSQL password exactly
3. No spaces before/after the password

### Error: "database does not exist"
**Solution:** 
1. Run: `psql -U postgres`
2. Run: `CREATE DATABASE mechanic_assist;`
3. Verify with: `\l`

### Error: "could not connect to server"
**Solution:**
1. Check PostgreSQL service is running:
   - Press `Win + R`
   - Type `services.msc`
   - Find "postgresql" service
   - Make sure it's running

---

## ✅ Quick Checklist

- [ ] PostgreSQL installed
- [ ] Database `mechanic_assist` created (using `CREATE DATABASE` command)
- [ ] `.env` file created in `backend/` folder
- [ ] Password updated in `.env` file (DB_PASSWORD=yourpassword)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Migrations created (`makemigrations`)
- [ ] Migrations applied (`migrate`)
- [ ] Superuser created (`createsuperuser`)
- [ ] Server runs without errors (`runserver`)

---

**That's it! Your database is ready! 🎉**

