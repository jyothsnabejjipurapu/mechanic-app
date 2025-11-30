# 🔧 Migration Error Fix

## Problem
The error `relation "users" does not exist` occurs because:
1. The `accounts` app migrations haven't been created yet
2. The custom User model needs to be migrated first before other apps

## Solution - Run These Commands in Order:

### Step 1: Create migrations for accounts app first
```bash
cd backend
python manage.py makemigrations accounts
```

### Step 2: Create migrations for services app
```bash
python manage.py makemigrations services
```

### Step 3: Create migrations for ratings app
```bash
python manage.py makemigrations ratings
```

### Step 4: Now apply all migrations
```bash
python manage.py migrate
```

## Alternative: Create all migrations at once

If you want to create migrations for all apps at once:
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## Important Order:
1. ✅ **accounts** (User model) - Must be first
2. ✅ **services** (depends on User)
3. ✅ **ratings** (depends on User and ServiceRequest)

---

**After running these commands, your database tables will be created! ✅**

