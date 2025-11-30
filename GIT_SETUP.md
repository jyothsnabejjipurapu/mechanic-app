# 🔧 Git Setup Guide

## ✅ What I've Created

1. **`.gitignore`** - Root level (covers common files)
2. **`backend/.gitignore`** - Django/Python specific
3. **`frontend/MechanicMobile/.gitignore`** - React Native specific
4. **`frontend/.gitignore`** - Frontend root
5. **`.gitattributes`** - Line ending normalization
6. **`README.md`** - Project documentation

---

## 📝 Files That Will Be Ignored

### Backend:
- ✅ `.env` files (sensitive credentials)
- ✅ `__pycache__/` (Python cache)
- ✅ `venv/` (virtual environment)
- ✅ `*.pyc` (compiled Python)
- ✅ `db.sqlite3` (local database)
- ✅ `/media` and `/staticfiles` (uploaded files)

### Frontend:
- ✅ `node_modules/` (dependencies)
- ✅ `build/` (build outputs)
- ✅ `.gradle/` (Gradle cache)
- ✅ `*.apk` (Android builds)
- ✅ `.env` files (API keys)

### General:
- ✅ `.DS_Store` (macOS)
- ✅ `Thumbs.db` (Windows)
- ✅ IDE files (`.vscode/`, `.idea/`)
- ✅ Log files

---

## 🚀 Initialize Git and Push

### Step 1: Initialize Git Repository

```powershell
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app"
git init
```

### Step 2: Add All Files

```powershell
git add .
```

### Step 3: Create Initial Commit

```powershell
git commit -m "Initial commit: Mechanic Assist Mini System

- Backend: Django REST API with JWT authentication
- Frontend: React Native mobile app
- Features: Service requests, nearby mechanics, ratings
- Database: PostgreSQL with migrations"
```

### Step 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `mechanic-assist-app`
3. Description: "Location-based mobile app for on-road vehicle breakdown support"
4. Choose **Private** or **Public**
5. **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

### Step 5: Add Remote and Push

```powershell
# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/mechanic-assist-app.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 🔐 Important: Before Pushing

### ⚠️ Check for Sensitive Files

Make sure these are NOT in your repository:

1. **`.env` files** - Contains database passwords, secret keys
2. **Database files** - `*.sqlite3`, `*.db`
3. **API keys** - Google Maps API keys, etc.
4. **Certificate files** - `*.keystore`, `*.p12`

### Verify with:

```powershell
# Check what will be committed
git status

# See if .env files are ignored
git check-ignore backend/.env
# Should output: backend/.env (meaning it's ignored ✅)
```

---

## 📋 Pre-Push Checklist

- [ ] All `.env` files are ignored (check with `git check-ignore`)
- [ ] No database files in repository
- [ ] No API keys hardcoded in source files
- [ ] `node_modules/` is ignored
- [ ] `venv/` or virtual environment is ignored
- [ ] Build artifacts are ignored
- [ ] README.md is updated
- [ ] .gitignore files are in place

---

## 🔄 Standard Git Workflow

### Daily Development:

```powershell
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to remote
git push
```

### Create Feature Branch:

```powershell
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes, then commit
git add .
git commit -m "Add new feature"

# Push branch
git push -u origin feature/new-feature

# Merge to main (via GitHub Pull Request or locally)
```

---

## 📝 Commit Message Best Practices

Use descriptive commit messages:

```powershell
# Good examples:
git commit -m "Add user registration endpoint"
git commit -m "Implement nearby mechanics finder"
git commit -m "Fix API authentication bug"
git commit -m "Update UI for service request screen"

# Bad examples:
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

---

## 🛡️ Security Reminder

**NEVER commit:**
- ❌ `.env` files
- ❌ Database credentials
- ❌ API keys
- ❌ Private keys
- ❌ Passwords

**If you accidentally commit sensitive data:**
1. Remove it from history: `git filter-branch` or use `git-filter-repo`
2. Change all passwords/keys
3. Force push (only if safe): `git push --force`

---

## 🎯 Quick Commands Summary

```powershell
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Your commit message"

# Add remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push
git push -u origin main

# Check status
git status

# Check ignored files
git check-ignore -v filename
```

---

**Your project is now ready for Git! 🚀**

