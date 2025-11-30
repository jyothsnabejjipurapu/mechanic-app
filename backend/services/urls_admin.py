from django.urls import path
from .views import admin_users_view, admin_services_view, admin_delete_user_view

urlpatterns = [
    path('users/', admin_users_view, name='admin-users'),
    path('services/', admin_services_view, name='admin-services'),
    path('users/<int:pk>/delete/', admin_delete_user_view, name='admin-delete-user'),
]

