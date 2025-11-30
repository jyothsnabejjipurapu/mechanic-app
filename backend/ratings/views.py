from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Avg
from accounts.models import User
from services.models import MechanicProfile, ServiceRequest
from .models import Rating
from .serializers import RatingSerializer, RatingCreateSerializer


class RatingCreateView(generics.CreateAPIView):
    """Create a rating"""
    queryset = Rating.objects.all()
    serializer_class = RatingCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        customer = self.request.user
        
        if customer.role != 'CUSTOMER':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only customers can create ratings")
        
        mechanic_id = self.request.data.get('mechanic_id')
        service_request_id = self.request.data.get('service_request_id')
        
        # Validate mechanic
        try:
            mechanic = User.objects.get(id=mechanic_id, role='MECHANIC')
        except User.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound("Mechanic not found")
        
        # Validate service request
        try:
            service_request = ServiceRequest.objects.get(
                id=service_request_id,
                customer=customer,
                mechanic=mechanic,
                status='COMPLETED'
            )
        except ServiceRequest.DoesNotExist:
            from rest_framework.exceptions import ValidationError
            raise ValidationError("Service request not found or not completed")
        
        # Check if rating already exists
        if Rating.objects.filter(customer=customer, service_request=service_request).exists():
            from rest_framework.exceptions import ValidationError
            raise ValidationError("You have already rated this service")
        
        # Create rating
        rating = serializer.save(
            customer=customer,
            mechanic=mechanic,
            service_request=service_request
        )
        
        # Update mechanic's average rating
        mechanic_profile = mechanic.mechanic_profile
        ratings = Rating.objects.filter(mechanic=mechanic)
        avg_rating = ratings.aggregate(Avg('stars'))['stars__avg'] or 0.0
        mechanic_profile.rating_avg = round(avg_rating, 2)
        mechanic_profile.rating_count = ratings.count()
        mechanic_profile.save()
        
        return rating


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def mechanic_ratings_view(request, mechanic_id):
    """Get all ratings for a mechanic"""
    try:
        mechanic = User.objects.get(id=mechanic_id, role='MECHANIC')
    except User.DoesNotExist:
        return Response(
            {'error': 'Mechanic not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    ratings = Rating.objects.filter(mechanic=mechanic).order_by('-created_at')
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
