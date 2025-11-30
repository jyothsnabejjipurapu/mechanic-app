from django.contrib import admin
from .models import Rating


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'mechanic', 'stars', 'created_at')
    list_filter = ('stars', 'created_at')
    search_fields = ('customer__name', 'customer__email', 'mechanic__name', 'mechanic__email', 'review_text')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
