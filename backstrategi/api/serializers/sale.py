from rest_framework import serializers
from ..models.sale import Sale
from ..models.client import Client
from ..models.agent import Agent
from ..models.property import Property
from ..serializers.client import ClientSerializer
from ..serializers.agent import AgentSerializer
from ..serializers.property import PropertySerializer

class SaleSerializer(serializers.ModelSerializer):
  client = serializers.PrimaryKeyRelatedField(queryset = Client.objects.all())
  agent = serializers.PrimaryKeyRelatedField(queryset = Agent.objects.all())
  property = serializers.PrimaryKeyRelatedField(queryset = Property.objects.all())

  class Meta:
    model = Sale
    fields = '__all__'
  
  def to_representation(self, instance):
    response = super().to_representation(instance)
    response['client'] = ClientSerializer(instance.client).data
    response['agent'] = AgentSerializer(instance.agent).data
    response['property'] = PropertySerializer(instance.property).data

    return response