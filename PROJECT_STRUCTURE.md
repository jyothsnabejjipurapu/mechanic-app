# Project Structure

## Backend Structure

```
backend/
├── accounts/              # User authentication and management
│   ├── models.py         # Custom User model
│   ├── serializers.py    # User serializers
│   ├── views.py          # Auth views (register, login, profile)
│   ├── urls.py           # Auth URLs
│   └── admin.py          # Admin configuration
│
├── services/             # Service requests and mechanic profiles
│   ├── models.py         # MechanicProfile, ServiceRequest models
│   ├── serializers.py    # Service serializers
│   ├── views.py          # Service request views
│   ├── utils.py          # Distance calculation, pricing
│   ├── urls_mechanic.py  # Mechanic profile endpoints
│   ├── urls_requests.py  # Service request endpoints
│   ├── urls_mechanics.py # Nearby mechanics endpoint
│   ├── urls_admin.py     # Admin endpoints
│   └── admin.py          # Admin configuration
│
├── ratings/              # Rating system
│   ├── models.py         # Rating model
│   ├── serializers.py    # Rating serializers
│   ├── views.py          # Rating views
│   ├── urls.py           # Rating URLs
│   └── admin.py          # Admin configuration
│
├── mechanic_assist/      # Django project settings
│   ├── settings.py       # Django configuration
│   ├── urls.py           # Main URL routing
│   └── wsgi.py           # WSGI configuration
│
├── requirements.txt      # Python dependencies
└── manage.py             # Django management script
```

## Frontend Structure

```
frontend/
├── src/
│   ├── config/
│   │   └── api.js                # API configuration with interceptors
│   │
│   ├── context/
│   │   └── AuthContext.js        # Authentication context
│   │
│   ├── services/
│   │   ├── authService.js        # Auth API calls
│   │   ├── mechanicService.js    # Mechanic API calls
│   │   ├── requestService.js     # Request API calls
│   │   └── ratingService.js      # Rating API calls
│   │
│   ├── screens/
│   │   ├── customer/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── CustomerHomeScreen.js
│   │   │   ├── CreateRequestScreen.js
│   │   │   └── RateMechanicScreen.js
│   │   │
│   │   └── mechanic/
│   │       ├── MechanicHomeScreen.js
│   │       └── MechanicProfileScreen.js
│   │
│   ├── components/
│   │   └── MapView.js            # Google Maps component
│   │
│   └── utils/
│       ├── constants.js           # App constants
│       └── location.js            # Location utilities
│
├── App.js                 # Main app component with navigation
└── package.json           # Node dependencies
```

## Key Features Implemented

### Backend
✅ Custom User model with roles (Customer/Mechanic/Admin)
✅ JWT Authentication
✅ Mechanic Profile with location and skills
✅ Service Request workflow (Requested → Accepted → Completed)
✅ Nearby mechanics finder with distance calculation
✅ Pricing engine (Base fare + per km rate)
✅ Rating system with average calculation
✅ Admin endpoints for user and service management

### Frontend
✅ Authentication screens (Login/Register)
✅ Customer flow:
   - Home screen with request list
   - Create service request
   - View nearby mechanics
   - Rate mechanic after completion
✅ Mechanic flow:
   - Dashboard with request list
   - Accept/Complete requests
   - Update profile (location, skills, availability)
✅ Location services integration
✅ Google Maps integration
✅ Role-based navigation

## API Endpoints

### Authentication
- POST `/api/auth/register/` - Register user
- POST `/api/auth/login/` - Login
- GET `/api/auth/me/` - Get current user
- PUT `/api/auth/profile/update/` - Update profile

### Mechanic Profile
- GET `/api/mechanic/profile/` - Get profile
- POST `/api/mechanic/profile/update/` - Update profile

### Service Requests
- POST `/api/requests/create/` - Create request
- GET `/api/requests/customer/` - Customer's requests
- GET `/api/requests/mechanic/` - Mechanic's requests
- POST `/api/requests/{id}/accept/` - Accept request
- POST `/api/requests/{id}/complete/` - Complete request

### Nearby Mechanics
- GET `/api/mechanics/nearby/?lat={lat}&lng={lng}` - Get nearby mechanics

### Ratings
- POST `/api/ratings/add/` - Add rating
- GET `/api/ratings/mechanic/{id}/` - Get mechanic ratings

### Admin
- GET `/api/admin/users/` - List all users
- GET `/api/admin/services/` - List all services
- DELETE `/api/admin/users/{id}/delete/` - Delete user

## Database Models

1. **User** - Custom user model with email, name, phone, role
2. **MechanicProfile** - Mechanic details, location, skills, ratings
3. **ServiceRequest** - Service requests with status workflow
4. **Rating** - Customer ratings for mechanics

## Next Steps

1. Run migrations: `python manage.py makemigrations && python manage.py migrate`
2. Create superuser: `python manage.py createsuperuser`
3. Install frontend dependencies: `cd frontend && npm install`
4. Configure Google Maps API key
5. Update API_BASE_URL in `frontend/src/config/api.js`
6. Run backend: `python manage.py runserver`
7. Run frontend: `npm start` or `npx react-native run-android/ios`

