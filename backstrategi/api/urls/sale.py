from rest_framework.routers import DefaultRouter
from ..view.sale import SaleViewSet

sale_router = DefaultRouter()
sale_router.register('sales', SaleViewSet, basename='sales')