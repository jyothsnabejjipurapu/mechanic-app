# 🔧 Fix "psql is not recognized" Error

## Problem
PostgreSQL's `psql` command is not in your system PATH.

## Solution Options

### Option 1: Use Full Path to psql (Quickest Fix)

**Find your PostgreSQL installation path:**
- Usually it's: `C:\Program Files\PostgreSQL\VERSION\bin\psql.exe`
- Common versions: 14, 15, or 16

**Use the full path:**
```powershell
# For PostgreSQL 15 (replace with your version)
& "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
```

**Or for PostgreSQL 14:**
```powershell
& "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
```

**Or for PostgreSQL 16:**
```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
```

---

### Option 2: Use pgAdmin (GUI - Easiest)

1. **Open pgAdmin** (installed with PostgreSQL)
   - Search for "pgAdmin" in Windows Start menu

2. **Connect to PostgreSQL Server**
   - Enter your password when asked

3. **Right-click on "Databases" → Create → Database**
   - Name: `mechanic_assist`
   - Click Save

4. **If database exists, right-click on `mechanic_assist` → Delete/Drop**
   - Click OK to confirm
   - Then create it again (right-click Databases → Create → Database)

---

### Option 3: Add PostgreSQL to PATH (Permanent Fix)

1. **Find PostgreSQL bin folder:**
   - Usually: `C:\Program Files\PostgreSQL\15\bin` (check your version)

2. **Add to PATH:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → Click "Environment Variables"
   - Under "System variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\Program Files\PostgreSQL\15\bin`
   - Click OK on all windows
   - **Restart PowerShell/Command Prompt**

3. **Now test:**
   ```powershell
   psql --version
   ```

---

### Option 4: Use SQL Shell (psql) from Start Menu

1. **Open SQL Shell (psql)** from Windows Start menu
   - Search for "SQL Shell" or "psql"

2. **Press Enter** for each prompt:
   - Server: [localhost] → Press Enter
   - Database: [postgres] → Press Enter
   - Port: [5432] → Press Enter
   - Username: [postgres] → Press Enter
   - Password: → Type your password and press Enter

3. **Then run SQL commands:**
   ```sql
   DROP DATABASE mechanic_assist;
   CREATE DATABASE mechanic_assist;
   \q
   ```

---

## Quick Test - Find PostgreSQL Installation

Run this in PowerShell to find where PostgreSQL is installed:

```powershell
Get-ChildItem "C:\Program Files\PostgreSQL" -ErrorAction SilentlyContinue
```

This will show you which version you have installed.

---

## Recommended: Use pgAdmin (Option 2)

**This is the easiest way if you have pgAdmin installed!**

