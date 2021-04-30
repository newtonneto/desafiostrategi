import factory
import factory.fuzzy
import string
from django.contrib.auth.models import User

class UserFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = User
  
  username = factory.fuzzy.FuzzyText(length=6, chars=string.ascii_lowercase)
  email = factory.fuzzy.FuzzyText(length=6, suffix='@email.com')
  password = factory.PostGenerationMethodCall('set_password', 'minhasenha')