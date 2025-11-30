# ⚡ Quick Start Guide - Run Your Project

## 🎯 Step-by-Step Instructions

### 📍 STEP 1: Run Backend (Django API)

**Open PowerShell/Terminal 1:**

```powershell
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app\backend"
python manage.py runserver
```

**✅ Success when you see:**
```
Starting development server at http://127.0.0.1:8000/
```

**🔍 Test in Browser:**
- Open: http://127.0.0.1:8000/admin/
- Login with your superuser account

**Keep this terminal running!** ⏸️

---

### 📍 STEP 2: Run Frontend Metro Bundler

**Open NEW PowerShell/Terminal 2:**

```powershell
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app\frontend"
npm start
```

**✅ Success when you see:**
```
Welcome to Metro!
...
Metro waiting on exp://192.168.x.x:8081
```

**Keep this terminal running!** ⏸️

---

### 📍 STEP 3: Run React Native App

**Open NEW PowerShell/Terminal 3:**

#### For Android:
```powershell
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app\frontend"
npm run android
```

**Requirements:**
- Android Studio installed ✅
- Android Emulator running OR phone connected via USB ✅

#### For iOS (Mac only):
```powershell
npm run ios
```

---

## 📱 Where You'll See the Output

### 1. **Backend Output:**
   - **Location**: Terminal 1 (where you ran `runserver`)
   - **Shows**: API requests, responses, errors
   - **Example Output**:
     ```
     [30/Nov/2025 11:00:00] "POST /api/auth/register/ HTTP/1.1" 201
     [30/Nov/2025 11:00:05] "GET /api/mechanics/nearby/ HTTP/1.1" 200
     ```

### 2. **Frontend App:**
   - **Location**: Android Emulator or Physical Device
   - **Shows**: Mobile app UI (Login screen first)
   - **Screens**: Login → Register → Home → Create Request → etc.

### 3. **Metro Bundler:**
   - **Location**: Terminal 2 (where you ran `npm start`)
   - **Shows**: Bundle compilation, hot reload, errors
   - **Example Output**:
     ```
     BUNDLE ./index.js
     ✓ Built in 2.5s
     ```

### 4. **Django Admin Panel:**
   - **Location**: Web Browser
   - **URL**: http://127.0.0.1:8000/admin/
   - **Shows**: Users, Requests, Ratings (all database data)

---

## 🧪 Quick Test

### Test Backend API:

1. **Open Browser**: http://127.0.0.1:8000/admin/
2. **Login** with superuser credentials
3. **You'll see**: All users, service requests, ratings

### Test Frontend App:

1. **App opens** on Android Emulator/Device
2. **You'll see**: Login Screen
3. **Click**: "Don't have an account? Register"
4. **Create account** as Customer or Mechanic
5. **Explore**: All screens and features

---

## 🔧 Important: Update API URL for Mobile

The app needs to connect to your backend. Update `frontend/src/config/api.js`:

**For Android Emulator:**
```javascript
const API_BASE_URL = 'http://10.0.2.2:8000/api';
```

**For Physical Device (find your computer's IP):**
```powershell
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

Then update:
```javascript
const API_BASE_URL = 'http://192.168.1.100:8000/api';  // Use YOUR IP
```

---

## 📊 Complete Flow

```
Terminal 1: Backend Running
    ↓
    API Server: http://localhost:8000
    ↓
Terminal 2: Metro Bundler Running
    ↓
    Bundling JavaScript
    ↓
Terminal 3: npm run android
    ↓
    App Opens on Device/Emulator
    ↓
    User sees Login Screen
    ↓
    App connects to Backend API
    ↓
    ✅ Full System Running!
```

---

## ✅ Checklist Before Running

- [ ] PostgreSQL database created (`mechanic_assist`)
- [ ] Database migrations applied (`python manage.py migrate`)
- [ ] Superuser created (`python manage.py createsuperuser`)
- [ ] `.env` file exists in `backend/` folder
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Frontend dependencies installed (`npm install --legacy-peer-deps`)
- [ ] Android Studio installed (for Android)
- [ ] Android Emulator running OR phone connected

---

## 🚀 Ready to Run!

1. **Start Backend** (Terminal 1) - `python manage.py runserver`
2. **Start Metro** (Terminal 2) - `npm start`
3. **Run App** (Terminal 3) - `npm run android`

**All three terminals should be running simultaneously!**

---

## 📞 Need Help?

- **Backend not starting?** → Check database connection in `.env`
- **Frontend not connecting?** → Update API URL in `src/config/api.js`
- **App not opening?** → Make sure Android Studio/Emulator is running

**Good luck! 🎉**

