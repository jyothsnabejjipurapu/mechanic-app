from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    """Serializer for Rating"""
    customer = UserSerializer(read_only=True)
    mechanic = UserSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = ('id', 'customer', 'mechanic', 'service_request', 'stars', 'review_text', 'created_at')
        read_only_fields = ('id', 'created_at')


class RatingCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating rating"""
    mechanic_id = serializers.IntegerField(write_only=True, required=True)
    service_request_id = serializers.IntegerField(write_only=True, required=True)
    
    class Meta:
        model = Rating
        fields = ('mechanic_id', 'service_request_id', 'stars', 'review_text')
        extra_kwargs = {
            'stars': {'required': True},
            'review_text': {'required': False},
        }

