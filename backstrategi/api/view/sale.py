from rest_framework import viewsets
from ..models.sale import Sale
from ..serializers.sale import SaleSerializer

class SaleViewSet(viewsets.ModelViewSet):
  queryset = Sale.objects.all()
  serializer_class = SaleSerializer