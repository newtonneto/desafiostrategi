from rest_framework import serializers
from ..models.agent import Agent

class AgentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Agent
    fields = '__all__'