from geopy.distance import geodesic
from django.conf import settings


def calculate_distance(lat1, lng1, lat2, lng2):
    """
    Calculate distance between two coordinates using Haversine formula (via geopy)
    Returns distance in kilometers
    """
    if not all([lat1, lng1, lat2, lng2]):
        return None
    
    try:
        point1 = (float(lat1), float(lng1))
        point2 = (float(lat2), float(lng2))
        distance = geodesic(point1, point2).kilometers
        return round(distance, 2)
    except (ValueError, TypeError) as e:
        return None


def calculate_estimated_cost(distance_km):
    """
    Calculate estimated cost based on distance
    Formula: Base Fare + (Distance × Per-KM Rate)
    """
    if distance_km is None:
        return None
    
    base_fare = getattr(settings, 'BASE_FARE', 100)
    per_km_rate = getattr(settings, 'PER_KM_RATE', 10)
    
    estimated_cost = base_fare + (distance_km * per_km_rate)
    return round(estimated_cost, 2)

