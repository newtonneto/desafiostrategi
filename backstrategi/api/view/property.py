from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models.property import Property
from ..serializers.property import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
  queryset = Property.objects.all()
  serializer_class = PropertySerializer
  permission_classes = [IsAuthenticated]