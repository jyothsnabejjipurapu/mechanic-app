from rest_framework import serializers
from accounts.models import User
from accounts.serializers import UserSerializer
from .models import MechanicProfile, ServiceRequest


class MechanicProfileSerializer(serializers.ModelSerializer):
    """Serializer for MechanicProfile"""
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = MechanicProfile
        fields = ('id', 'user', 'user_id', 'skill_type', 'availability', 'latitude', 
                  'longitude', 'rating_avg', 'rating_count', 'created_at', 'updated_at')
        read_only_fields = ('id', 'rating_avg', 'rating_count', 'created_at', 'updated_at')


class MechanicProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating mechanic profile"""
    
    class Meta:
        model = MechanicProfile
        fields = ('skill_type', 'availability', 'latitude', 'longitude')


class NearbyMechanicSerializer(serializers.ModelSerializer):
    """Serializer for nearby mechanics with distance"""
    user = UserSerializer(read_only=True)
    distance_km = serializers.SerializerMethodField()
    
    class Meta:
        model = MechanicProfile
        fields = ('id', 'user', 'skill_type', 'availability', 'latitude', 'longitude',
                  'rating_avg', 'rating_count', 'distance_km')
    
    def get_distance_km(self, obj):
        # Distance will be added by the view after serialization
        return getattr(obj, '_distance_km', None)


class ServiceRequestSerializer(serializers.ModelSerializer):
    """Serializer for ServiceRequest"""
    customer = UserSerializer(read_only=True)
    customer_id = serializers.IntegerField(write_only=True, required=False)
    mechanic = UserSerializer(read_only=True)
    mechanic_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = ServiceRequest
        fields = ('id', 'customer', 'customer_id', 'mechanic', 'mechanic_id', 'issue_text',
                  'customer_lat', 'customer_lng', 'distance_km', 'estimated_cost', 'status',
                  'created_at', 'updated_at', 'completed_at')
        read_only_fields = ('id', 'distance_km', 'estimated_cost', 'status', 'created_at',
                           'updated_at', 'completed_at')


class ServiceRequestCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating service request"""
    mechanic_id = serializers.IntegerField(write_only=True, required=True)
    
    class Meta:
        model = ServiceRequest
        fields = ('issue_text', 'customer_lat', 'customer_lng', 'mechanic_id')
        extra_kwargs = {
            'issue_text': {'required': True},
            'customer_lat': {'required': True},
            'customer_lng': {'required': True},
        }


class ServiceRequestListSerializer(serializers.ModelSerializer):
    """Serializer for listing service requests"""
    customer = UserSerializer(read_only=True)
    mechanic = UserSerializer(read_only=True)
    
    class Meta:
        model = ServiceRequest
        fields = ('id', 'customer', 'mechanic', 'issue_text', 'customer_lat', 'customer_lng',
                  'distance_km', 'estimated_cost', 'status', 'created_at', 'updated_at',
                  'completed_at')

