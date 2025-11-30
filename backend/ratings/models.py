from django.db import models
from accounts.models import User
from services.models import ServiceRequest


class Rating(models.Model):
    """Rating model for mechanic reviews"""
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings_given')
    mechanic = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings_received')
    service_request = models.OneToOneField(ServiceRequest, on_delete=models.CASCADE, related_name='rating', null=True, blank=True)
    stars = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    review_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'ratings'
        ordering = ['-created_at']
        unique_together = [['customer', 'service_request']]
    
    def __str__(self):
        return f"{self.customer.name} rated {self.mechanic.name} - {self.stars} stars"
