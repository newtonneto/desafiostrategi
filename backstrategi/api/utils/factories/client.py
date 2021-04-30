import factory
import factory.fuzzy
import string
import datetime
from api.models.client import Client

GENDER_CHOICES = [1, 2, 3]

class ClientFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = Client

  name = factory.Fake('name')
  birth = factory.fuzzy.FuzzyDate(datetime.date(1990, 1, 1), datetime.date(2020, 1, 21))
  gender = factory.fuzzy.FuzzyChoice(GENDER_CHOICES)