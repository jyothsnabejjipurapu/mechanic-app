"""
URL configuration for mechanic_assist project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/mechanic/', include('services.urls_mechanic')),
    path('api/requests/', include('services.urls_requests')),
    path('api/mechanics/', include('services.urls_mechanics')),
    path('api/ratings/', include('ratings.urls')),
    path('api/admin/', include('services.urls_admin')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

