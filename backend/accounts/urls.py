from django.urls import path
from .views import RegisterView, login_view, get_current_user, ProfileUpdateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('me/', get_current_user, name='me'),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
]

