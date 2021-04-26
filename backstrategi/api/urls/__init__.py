from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .property import property_router
from .client import client_router
from .sale import sale_router
from .agent import agent_router

urlpatterns = [
  path('', include(property_router.urls)),
  path('', include(client_router.urls)),
  path('', include(sale_router.urls)),
  path('', include(agent_router.urls)),
  path('login/', TokenObtainPairView.as_view(), name='login'),
  path('refresh/', TokenRefreshView.as_view(), name='refresh')
]