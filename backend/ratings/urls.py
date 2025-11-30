from django.urls import path
from .views import RatingCreateView, mechanic_ratings_view

urlpatterns = [
    path('add/', RatingCreateView.as_view(), name='add-rating'),
    path('mechanic/<int:mechanic_id>/', mechanic_ratings_view, name='mechanic-ratings'),
]

