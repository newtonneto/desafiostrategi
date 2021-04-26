from rest_framework.routers import DefaultRouter
from ..view.client import ClientViewSet

client_router = DefaultRouter()
client_router.register('clients', ClientViewSet, basename='clients')