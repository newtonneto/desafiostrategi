from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from ..models.agent import Agent
from ..serializers.agent import AgentSerializer
from ..serializers.user import UserSerializer

class AgentViewSet(viewsets.ModelViewSet):
  queryset = Agent.objects.all()
  serializer_class = AgentSerializer

  @transaction.atomic
  def create(self, request, *args, **kwargs):
    user_data = request.data.pop('user')
    user_serializer = UserSerializer(data = user_data)
    user_serializer.is_valid(raise_exception=True)
    user = user_serializer.save()
    
    agent_data = {
      'user': user.id,
      **request.data
    }

    agent_serializer = AgentSerializer(data = agent_data)
    agent_serializer.is_valid(raise_exception=True)
    agent_serializer.save()

    return Response(agent_serializer.data, status=status.HTTP_201_CREATED)

  @transaction.atomic
  def update(self, request, *args, **kwargs):
    agent = self.get_object()
    user = agent.user
    user_data = request.data.pop('user')
    user_serializer = UserSerializer(user, data = user_data)
    user_serializer.is_valid(raise_exception=True)
    user_serializer.save() #Salva a atualização do user

    agent_data = {
      'user': user.id,
      **request.data
    }

    agent_serializer = AgentSerializer(agent, data = agent_data)
    agent_serializer.is_valid(raise_exception=True)
    agent_serializer.save()

    return Response(agent_serializer.data, status=status.HTTP_200_OK)
  
  @transaction.atomic
  def partial_update(self, request, *args, **kwargs):
    agent = self.get_object()
    if 'user' in request.data:
      user = agent.user
      user_data = request.data.pop('user')
      user_serializer = UserSerializer(user, data = user_data, partial=True)
      user_serializer.is_valid(raise_exception=True)
      user_serializer.save() #Salva a atualização do user
    
    agent_data = {
      **request.data
    }

    agent_serializer = AgentSerializer(agent, data = agent_data, partial=True)
    agent_serializer.is_valid(raise_exception=True)
    agent_serializer.save()

    return Response(agent_serializer.data, status=status.HTTP_200_OK)