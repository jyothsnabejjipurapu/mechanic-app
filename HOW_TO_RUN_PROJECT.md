# 🚀 How to Run the Mechanic Assist Project

## Overview
This is a full-stack project with:
- **Backend**: Django REST API (runs on http://localhost:8000)
- **Frontend**: React Native mobile app

---

## 📍 PART 1: Run the Backend (Django API)

### Step 1: Open Terminal/PowerShell in Backend Folder

```bash
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app\backend"
```

### Step 2: Activate Virtual Environment (if you created one)

```bash
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Or Windows CMD:
venv\Scripts\activate.bat
```

### Step 3: Start Django Server

```bash
python manage.py runserver
```

**You should see:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Step 4: Test Backend API

**Open your browser and go to:**

1. **Admin Panel**: http://127.0.0.1:8000/admin/
   - Login with superuser credentials (created earlier)

2. **API Root**: http://127.0.0.1:8000/api/
   - You'll see available endpoints

3. **Test Registration Endpoint** (using Postman, curl, or browser):
   - URL: http://127.0.0.1:8000/api/auth/register/
   - Method: POST
   - Body (JSON):
   ```json
   {
     "email": "test@example.com",
     "name": "Test User",
     "phone": "1234567890",
     "role": "CUSTOMER",
     "password": "testpass123",
     "password2": "testpass123"
   }
   ```

**✅ Backend is running when you see the server start message!**

---

## 📍 PART 2: Run the Frontend (React Native App)

### Step 1: Open NEW Terminal/PowerShell in Frontend Folder

```bash
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app\frontend"
```

### Step 2: Create Missing React Native Config Files

Before running, we need to create essential config files:

#### Create `babel.config.js`:
```bash
# Create the file in frontend folder
```

#### Create `metro.config.js`:
```bash
# Create the file in frontend folder
```

#### Create `index.js`:
```bash
# Create the entry point file
```

### Step 3: Start Metro Bundler

```bash
npm start
```

**You should see:**
```
Welcome to Metro!
...
Metro waiting on exp://192.168.x.x:8081
```

**Keep this terminal open!**

### Step 4: Run on Android (in another terminal)

**Open a NEW terminal and run:**

```bash
cd "C:\Users\LENOVO\OneDrive\Desktop\Mechanic app\frontend"
npm run android
```

**Requirements:**
- Android Studio installed
- Android emulator running OR physical device connected
- USB debugging enabled (for physical device)

### OR Run on iOS (Mac only)

```bash
npm run ios
```

---

## 📱 Where You'll See the Output

### Backend Output:
- **Terminal**: Shows API requests, errors, and logs
- **Browser**: Visit http://127.0.0.1:8000/admin/ to see Django admin
- **API Testing**: Use Postman or browser DevTools to test endpoints

### Frontend Output:
- **Android Emulator**: App will open automatically
- **Physical Device**: App will install and open
- **Metro Bundler Terminal**: Shows compilation status, errors, and hot reload

---

## 🧪 Test the Complete System

### Option 1: Test with Postman/Insomnia

1. **Register a Customer:**
   ```
   POST http://localhost:8000/api/auth/register/
   Body:
   {
     "email": "customer@test.com",
     "name": "John Doe",
     "phone": "1234567890",
     "role": "CUSTOMER",
     "password": "password123",
     "password2": "password123"
   }
   ```

2. **Login:**
   ```
   POST http://localhost:8000/api/auth/login/
   Body:
   {
     "email": "customer@test.com",
     "password": "password123"
   }
   ```

3. **Get Nearby Mechanics:**
   ```
   GET http://localhost:8000/api/mechanics/nearby/?lat=28.6139&lng=77.2090
   Headers:
   Authorization: Bearer YOUR_ACCESS_TOKEN
   ```

### Option 2: Use Django Admin Panel

1. Go to: http://127.0.0.1:8000/admin/
2. Login with superuser credentials
3. You can:
   - View all users
   - View service requests
   - View ratings
   - Manage data manually

### Option 3: Test with React Native App

1. **On Android/iOS Device:**
   - App will show Login screen
   - Register/Login
   - Create service requests
   - View mechanics
   - Rate services

---

## 📊 Expected Output Locations

| Component | Where to See Output | URL/Location |
|-----------|---------------------|--------------|
| **Backend API** | Terminal + Browser | http://127.0.0.1:8000 |
| **Django Admin** | Browser | http://127.0.0.1:8000/admin/ |
| **API Endpoints** | Postman/Browser | http://127.0.0.1:8000/api/... |
| **Frontend App** | Android Emulator/Device | Mobile screen |
| **Metro Bundler** | Terminal | Console logs |
| **API Logs** | Backend Terminal | Request logs |

---

## 🔧 Quick Start Commands

### Terminal 1 - Backend:
```bash
cd backend
python manage.py runserver
```

### Terminal 2 - Frontend Metro:
```bash
cd frontend
npm start
```

### Terminal 3 - Frontend Android:
```bash
cd frontend
npm run android
```

---

## ⚠️ Important Notes

1. **Backend must run first** - Frontend needs the API to be available
2. **Update API URL** - In `frontend/src/config/api.js`, make sure `API_BASE_URL` points to your backend:
   ```javascript
   // For emulator:
   const API_BASE_URL = 'http://10.0.2.2:8000/api';
   
   // For physical device (use your computer's IP):
   const API_BASE_URL = 'http://192.168.1.XXX:8000/api';
   ```

3. **Database must be set up** - Make sure PostgreSQL is running and migrations are applied

4. **For mobile testing** - Use your computer's IP address (not localhost) in API config

---

## 🐛 Troubleshooting

### Backend won't start?
- Check if database is running
- Verify `.env` file exists with correct credentials
- Check if port 8000 is already in use

### Frontend won't run?
- Make sure `node_modules` is installed (`npm install --legacy-peer-deps`)
- Check if Android Studio is installed (for Android)
- Verify React Native CLI is installed globally

### App can't connect to backend?
- Update API URL in `frontend/src/config/api.js`
- Make sure backend is running
- Check firewall settings
- Use computer's IP address, not localhost

---

**Ready to run! Start with the backend, then the frontend! 🚀**

