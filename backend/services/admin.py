from django.contrib import admin
from .models import MechanicProfile, ServiceRequest


@admin.register(MechanicProfile)
class MechanicProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'skill_type', 'availability', 'rating_avg', 'rating_count', 'created_at')
    list_filter = ('skill_type', 'availability', 'created_at')
    search_fields = ('user__name', 'user__email', 'user__phone')
    readonly_fields = ('rating_avg', 'rating_count', 'created_at', 'updated_at')


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'mechanic', 'status', 'distance_km', 'estimated_cost', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer__name', 'customer__email', 'mechanic__name', 'mechanic__email', 'issue_text')
    readonly_fields = ('created_at', 'updated_at', 'completed_at')
    date_hierarchy = 'created_at'
