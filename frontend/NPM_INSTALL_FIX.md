# 🔧 Fix npm install Error

## Problem
The error occurs because `react-native-maps` has a peer dependency conflict with React version.

## Solution

### Option 1: Install with legacy peer deps (Quick Fix)

```bash
cd frontend
npm install --legacy-peer-deps
```

This will install dependencies even with version conflicts.

---

### Option 2: Use the updated package.json (Recommended)

I've updated your `package.json` to fix the version conflicts. Now run:

```bash
cd frontend
npm install
```

---

### Option 3: Clean install (If above doesn't work)

```bash
cd frontend

# Delete node_modules and package-lock.json if they exist
rm -r node_modules
rm package-lock.json

# Install fresh
npm install --legacy-peer-deps
```

For Windows PowerShell:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install --legacy-peer-deps
```

---

## What I Fixed

1. Updated `react-native-maps` from `^1.8.0` to `^1.15.0` (more compatible)
2. Made React version flexible with `^18.2.0`

---

## After Installation

Once `npm install` completes successfully, you can:

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **Run on Android:**
   ```bash
   npm run android
   ```

3. **Run on iOS:**
   ```bash
   npm run ios
   ```

---

## Note

Since this is a React Native app structure, you'll need:
- Node.js 16+ installed
- React Native development environment set up
- Android Studio (for Android) or Xcode (for iOS)

If you haven't initialized this as a full React Native project, you may need to run:
```bash
npx react-native init MechanicApp --template react-native-template-typescript
```
Then copy your `src` folder into the new project.

