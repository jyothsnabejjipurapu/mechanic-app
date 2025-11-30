from django.db import models
from accounts.models import User


class MechanicProfile(models.Model):
    """Profile model for mechanics"""
    
    SKILL_TYPE_CHOICES = [
        ('GENERAL_REPAIR', 'General Repair'),
        ('TYRES', 'Tyres'),
        ('ELECTRICAL', 'Electrical'),
        ('ENGINE', 'Engine'),
        ('BATTERY', 'Battery'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mechanic_profile')
    skill_type = models.CharField(max_length=50, choices=SKILL_TYPE_CHOICES, default='GENERAL_REPAIR')
    availability = models.BooleanField(default=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    rating_avg = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    rating_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'mechanic_profiles'
        ordering = ['-rating_avg', '-rating_count']
    
    def __str__(self):
        return f"{self.user.name} - {self.get_skill_type_display()}"


class ServiceRequest(models.Model):
    """Service request model"""
    
    STATUS_CHOICES = [
        ('REQUESTED', 'Requested'),
        ('ACCEPTED', 'Accepted'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customer_requests')
    mechanic = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='mechanic_requests')
    issue_text = models.TextField()
    customer_lat = models.DecimalField(max_digits=9, decimal_places=6)
    customer_lng = models.DecimalField(max_digits=9, decimal_places=6)
    distance_km = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='REQUESTED')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'service_requests'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Request #{self.id} - {self.customer.name} - {self.status}"
