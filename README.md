# 🌐 Mechanic Assist Mini System

A Lightweight Location-Based Mobile App for On-Road Vehicle Breakdown Support

## 📋 Overview

Mechanic Assist Mini System is a simple, software-only, mobile-first platform that connects stranded vehicle owners with nearby mechanics. The app helps users find verified mechanics quickly, get transparent pricing estimates, and track service requests.

### Key Features

- ⚡ **Lightweight Service Request System** - Quick request creation and mechanic assignment
- 🗺️ **Auto GPS Capture** - Automatic location detection
- 📍 **Map Preview** - View breakdown location on Google Maps
- 💰 **Distance-Based Cost Estimate** - Transparent pricing calculation
- 👥 **Role-Based Access** - Separate interfaces for customers and mechanics
- ⭐ **Post-Service Rating** - Rate mechanics after service completion
- 🛠️ **Admin Lite Panel** - Basic admin tools for managing users and services

## 🏗️ Project Structure

```
Mechanic app/
├── backend/                    # Django REST API
│   ├── accounts/              # User authentication
│   ├── services/              # Service requests & mechanic profiles
│   ├── ratings/               # Rating system
│   └── mechanic_assist/       # Django project settings
│
└── frontend/
    └── MechanicMobile/        # React Native mobile app
        ├── android/           # Android build files
        ├── ios/               # iOS build files
        └── src/               # App source code
```

## 🛠️ Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework 3.14.0
- JWT Authentication (djangorestframework-simplejwt)
- PostgreSQL
- Geopy (for distance calculation)

### Frontend
- React Native 0.72.7
- React Navigation
- Google Maps SDK
- Axios (for API calls)

## 📦 Installation & Setup

### Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- Java 17 (for React Native Android)
- Android Studio (for Android development)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file** (see `.env.example`)
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   DB_NAME=mechanic_assist
   DB_USER=postgres
   DB_PASSWORD=your-db-password
   DB_HOST=localhost
   DB_PORT=5432
   BASE_FARE=100
   PER_KM_RATE=10
   ```

5. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE mechanic_assist;
   ```

6. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Run development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend/MechanicMobile directory**
   ```bash
   cd frontend/MechanicMobile
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure API URL**
   - Edit `src/config/api.js`
   - For Android Emulator: `http://10.0.2.2:8000/api`
   - For Physical Device: Use your computer's IP address

4. **Run the app**
   ```bash
   # Start Metro bundler
   npm start
   
   # In another terminal, run Android
   npx react-native run-android
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `GET /api/auth/me/` - Get current user
- `PUT /api/auth/profile/update/` - Update profile

### Mechanic Profile
- `GET /api/mechanic/profile/` - Get mechanic profile
- `POST /api/mechanic/profile/update/` - Update mechanic profile

### Service Requests
- `POST /api/requests/create/` - Create service request
- `GET /api/requests/customer/` - Get customer's requests
- `GET /api/requests/mechanic/` - Get mechanic's requests
- `POST /api/requests/{id}/accept/` - Accept request
- `POST /api/requests/{id}/complete/` - Complete request

### Nearby Mechanics
- `GET /api/mechanics/nearby/?lat={lat}&lng={lng}` - Get nearby mechanics

### Ratings
- `POST /api/ratings/add/` - Add rating
- `GET /api/ratings/mechanic/{id}/` - Get mechanic ratings

### Admin
- `GET /api/admin/users/` - List all users
- `GET /api/admin/services/` - List all services
- `DELETE /api/admin/users/{id}/delete/` - Delete user

## 🔄 Workflow

1. **Customer Registration/Login**
   - Customer registers or logs in
   - App auto-captures GPS location

2. **Create Service Request**
   - Customer describes the issue
   - System finds nearby mechanics
   - Customer selects a mechanic
   - Request is sent with location and estimated cost

3. **Mechanic Response**
   - Mechanic receives notification
   - Views request details and location
   - Accepts or rejects the request

4. **Service Completion**
   - Mechanic arrives and fixes the issue
   - Marks service as completed

5. **Rating**
   - Customer rates the mechanic
   - Rating updates mechanic's profile

## 💾 Database Schema

### Users
- id, email, name, phone, role (CUSTOMER/MECHANIC/ADMIN), password_hash, created_at

### MechanicProfile
- id, user (FK), skill_type, availability, latitude, longitude, rating_avg, rating_count

### ServiceRequest
- id, customer (FK), mechanic (FK), issue_text, customer_lat, customer_lng, distance_km, estimated_cost, status, created_at

### Rating
- id, customer (FK), mechanic (FK), service_request (FK), stars (1-5), review_text, created_at

## 🧪 Testing

### Backend
```bash
cd backend
python manage.py test
```

## 🚀 Deployment

### Backend (Railway/Render/AWS)
1. Set environment variables
2. Configure PostgreSQL database
3. Run migrations
4. Deploy Django app

### Frontend
1. Build Android APK: `cd android && ./gradlew assembleRelease`
2. Build iOS: Configure in Xcode
3. Deploy to Google Play Store / Apple App Store

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support, create an issue in the repository.

---

**Note**: This is a minimal, lightweight system designed for quick deployment and easy maintenance. No heavy infrastructure components are required.
