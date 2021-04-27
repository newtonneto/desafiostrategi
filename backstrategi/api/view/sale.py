from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models.sale import Sale
from ..serializers.sale import SaleSerializer

class SaleViewSet(viewsets.ModelViewSet):
  queryset = Sale.objects.all()
  serializer_class = SaleSerializer
  permission_classes = [IsAuthenticated]