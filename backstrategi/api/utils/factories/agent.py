import factory
import factory.fuzzy
import string
import datetime
from api.utils.factories.user import UserFactory
from api.models.agent import Agent

GENDER_CHOICES = [1, 2, 3]

class AgentFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = Agent

  name = factory.Faker('name')
  birth = factory.fuzzy.FuzzyDate(datetime.date(1990, 1, 1), datetime.date(2020, 1, 21))
  user = factory.SubFactory(UserFactory)
  gender = factory.fuzzy.FuzzyChoice(GENDER_CHOICES)