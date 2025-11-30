from django.urls import path
from .views import nearby_mechanics_view

urlpatterns = [
    path('nearby/', nearby_mechanics_view, name='nearby-mechanics'),
]

