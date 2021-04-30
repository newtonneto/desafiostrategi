import factory
import factory.fuzzy
import string
import datetime
from api.models.property import Property

class PropertyFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = Property
  
  value = factory.fuzzy.FuzzyDecimal(100000.00, 999999.99)
  street = factory.Faker('address')
  number = factory.fuzzy.FuzzyInteger(1000, 9999)
  district = factory.Faker('name')
  zipcode = factory.fuzzy.FuzzyInteger(50000000, 59999999)
  city = factory.Faker('first_name')
  state = factory.fuzzy.FuzzyText(length=2)
