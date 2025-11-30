from django.urls import path
from .views import (
    ServiceRequestCreateView, customer_requests_view, mechanic_requests_view,
    accept_request_view, complete_request_view
)

urlpatterns = [
    path('create/', ServiceRequestCreateView.as_view(), name='create-request'),
    path('customer/', customer_requests_view, name='customer-requests'),
    path('mechanic/', mechanic_requests_view, name='mechanic-requests'),
    path('<int:pk>/accept/', accept_request_view, name='accept-request'),
    path('<int:pk>/complete/', complete_request_view, name='complete-request'),
]

