from rest_framework import viewsets
from ..models.property import Property
from ..serializers.property import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
  queryset = Property.objects.all()
  serializer_class = PropertySerializer