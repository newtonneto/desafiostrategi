from rest_framework.routers import DefaultRouter
from ..view.agent import AgentViewSet

agent_router = DefaultRouter()
agent_router.register('agents', AgentViewSet, basename='agents')