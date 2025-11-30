from django.urls import path
from .views import MechanicProfileView, MechanicProfileUpdateView

urlpatterns = [
    path('profile/', MechanicProfileView.as_view(), name='mechanic-profile'),
    path('profile/update/', MechanicProfileUpdateView.as_view(), name='mechanic-profile-update'),
]

