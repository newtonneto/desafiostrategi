from rest_framework import viewsets
from ..models.client import Client
from ..serializers.client import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
  queryset = Client.objects.all()
  serializer_class = ClientSerializer