from rest_framework.routers import DefaultRouter
from ..view.property import PropertyViewSet

property_router = DefaultRouter()
property_router.register('properties', PropertyViewSet, basename='properties')