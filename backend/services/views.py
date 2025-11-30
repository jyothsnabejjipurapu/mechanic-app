from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
from accounts.models import User
from .models import MechanicProfile, ServiceRequest
from .serializers import (
    MechanicProfileSerializer, MechanicProfileUpdateSerializer,
    NearbyMechanicSerializer, ServiceRequestSerializer,
    ServiceRequestCreateSerializer, ServiceRequestListSerializer
)
from .utils import calculate_distance, calculate_estimated_cost


class MechanicProfileView(generics.RetrieveAPIView):
    """Get mechanic profile"""
    queryset = MechanicProfile.objects.all()
    serializer_class = MechanicProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        try:
            return self.request.user.mechanic_profile
        except MechanicProfile.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound("Mechanic profile not found. Please update your profile.")


class MechanicProfileUpdateView(generics.UpdateAPIView):
    """Update mechanic profile"""
    serializer_class = MechanicProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        profile, created = MechanicProfile.objects.get_or_create(user=self.request.user)
        return profile
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(MechanicProfileSerializer(instance).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def nearby_mechanics_view(request):
    """Get nearby mechanics sorted by distance"""
    lat = request.query_params.get('lat')
    lng = request.query_params.get('lng')
    
    if not lat or not lng:
        return Response(
            {'error': 'Latitude and longitude are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        lat = float(lat)
        lng = float(lng)
    except (ValueError, TypeError):
        return Response(
            {'error': 'Invalid latitude or longitude'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get all available mechanics
    mechanics = MechanicProfile.objects.filter(
        availability=True,
        latitude__isnull=False,
        longitude__isnull=False
    )
    
    # Calculate distance for each mechanic
    mechanics_with_distance = []
    for mechanic in mechanics:
        distance = calculate_distance(lat, lng, mechanic.latitude, mechanic.longitude)
        if distance is not None:
            mechanics_with_distance.append({
                'mechanic': mechanic,
                'distance': distance
            })
    
    # Sort by distance
    mechanics_with_distance.sort(key=lambda x: x['distance'])
    
    # Add distance as attribute to mechanics
    for item in mechanics_with_distance:
        item['mechanic']._distance_km = round(item['distance'], 2)
    
    # Serialize with distance
    serializer = NearbyMechanicSerializer(
        [m['mechanic'] for m in mechanics_with_distance],
        many=True,
        context={'request': request}
    )
    
    return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceRequestCreateView(generics.CreateAPIView):
    """Create service request"""
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        customer = request.user
        
        if customer.role != 'CUSTOMER':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only customers can create service requests")
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        mechanic_id = serializer.validated_data.get('mechanic_id')
        
        try:
            mechanic = User.objects.get(id=mechanic_id, role='MECHANIC')
        except User.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound("Mechanic not found")
        
        # Get mechanic profile for location
        try:
            mechanic_profile = mechanic.mechanic_profile
            mechanic_lat = mechanic_profile.latitude
            mechanic_lng = mechanic_profile.longitude
        except MechanicProfile.DoesNotExist:
            from rest_framework.exceptions import ValidationError
            raise ValidationError("Mechanic profile not found")
        
        customer_lat = float(serializer.validated_data['customer_lat'])
        customer_lng = float(serializer.validated_data['customer_lng'])
        
        # Calculate distance
        distance_km = calculate_distance(
            customer_lat, customer_lng,
            mechanic_lat, mechanic_lng
        )
        
        # Calculate estimated cost
        estimated_cost = calculate_estimated_cost(distance_km)
        
        # Save request
        service_request = serializer.save(
            customer=customer,
            mechanic=mechanic,
            distance_km=distance_km,
            estimated_cost=estimated_cost,
            status='REQUESTED'
        )
        
        # Return with full serializer
        response_serializer = ServiceRequestListSerializer(service_request)
        headers = self.get_success_headers(response_serializer.data)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def customer_requests_view(request):
    """Get all service requests for customer"""
    user = request.user
    
    if user.role != 'CUSTOMER':
        return Response(
            {'error': 'Only customers can view their requests'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    requests = ServiceRequest.objects.filter(customer=user).order_by('-created_at')
    serializer = ServiceRequestListSerializer(requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def mechanic_requests_view(request):
    """Get all service requests for mechanic"""
    user = request.user
    
    if user.role != 'MECHANIC':
        return Response(
            {'error': 'Only mechanics can view their requests'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    requests = ServiceRequest.objects.filter(
        Q(mechanic=user) | Q(mechanic__isnull=True, status='REQUESTED')
    ).order_by('-created_at')
    
    serializer = ServiceRequestListSerializer(requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def accept_request_view(request, pk):
    """Accept a service request"""
    try:
        service_request = ServiceRequest.objects.get(pk=pk)
    except ServiceRequest.DoesNotExist:
        return Response(
            {'error': 'Service request not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.user != service_request.mechanic:
        return Response(
            {'error': 'You can only accept requests assigned to you'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    if service_request.status != 'REQUESTED':
        return Response(
            {'error': f'Request is already {service_request.status}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    service_request.status = 'ACCEPTED'
    service_request.save()
    
    serializer = ServiceRequestListSerializer(service_request)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def complete_request_view(request, pk):
    """Complete a service request"""
    try:
        service_request = ServiceRequest.objects.get(pk=pk)
    except ServiceRequest.DoesNotExist:
        return Response(
            {'error': 'Service request not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.user != service_request.mechanic:
        return Response(
            {'error': 'You can only complete requests assigned to you'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    if service_request.status != 'ACCEPTED':
        return Response(
            {'error': 'Request must be accepted before completion'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    service_request.status = 'COMPLETED'
    service_request.completed_at = timezone.now()
    service_request.save()
    
    serializer = ServiceRequestListSerializer(service_request)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Admin Views
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def admin_users_view(request):
    """Admin: Get all users"""
    if request.user.role != 'ADMIN':
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    users = User.objects.all().order_by('-created_at')
    from accounts.serializers import UserSerializer
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def admin_services_view(request):
    """Admin: Get all service requests"""
    if request.user.role != 'ADMIN':
        return Response(
            {'error': 'Only admins can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    services = ServiceRequest.objects.all().order_by('-created_at')
    serializer = ServiceRequestListSerializer(services, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def admin_delete_user_view(request, pk):
    """Admin: Delete a user"""
    if request.user.role != 'ADMIN':
        return Response(
            {'error': 'Only admins can delete users'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        user = User.objects.get(pk=pk)
        if user == request.user:
            return Response(
                {'error': 'You cannot delete your own account'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.delete()
        return Response(
            {'message': 'User deleted successfully'},
            status=status.HTTP_200_OK
        )
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
