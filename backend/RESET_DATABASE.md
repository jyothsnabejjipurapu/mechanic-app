# 🔄 Reset Database and Fix Migration Error

## Problem
The migration failed because the `users` table didn't exist when Django tried to apply admin migrations.

## Solution: Reset Database and Start Fresh

### Option 1: Drop and Recreate Database (Recommended for Development)

**Step 1: Drop the database**
```bash
# Connect to PostgreSQL
psql -U postgres

# Drop the database (this will delete all data)
DROP DATABASE mechanic_assist;

# Create it again
CREATE DATABASE mechanic_assist;

# Exit
\q
```

**Step 2: Run migrations from scratch**
```bash
cd backend
python manage.py migrate
```

**Step 3: Create superuser**
```bash
python manage.py createsuperuser
```

---

### Option 2: Fake Failed Migrations (If you have important data)

**WARNING: Only use this if you have data you want to keep!**

```bash
cd backend

# Fake the accounts migration
python manage.py migrate accounts --fake

# Now run all migrations
python manage.py migrate
```

---

## Quick Fix Commands (Copy and Paste)

**Run these commands in PowerShell:**

```powershell
# 1. Connect to PostgreSQL and reset database
psql -U postgres
```

**Then in PostgreSQL:**
```sql
DROP DATABASE mechanic_assist;
CREATE DATABASE mechanic_assist;
\q
```

**Then back in PowerShell:**
```powershell
cd backend
python manage.py migrate
python manage.py createsuperuser
```

---

**After this, your database will be properly set up! ✅**

