from django.db import models
from .client import Client
from .agent import Agent
from .property import Property

class Sale(models.Model):
  PAYMENT_CHOICES = [
    (1, 'a vista'),
    (2, 'parcelado 180x')
  ]

  payment = models.IntegerField(choices=PAYMENT_CHOICES, default=1)
  client = models.ForeignKey(Client, on_delete=models.PROTECT)
  agent = models.ForeignKey(Agent, on_delete=models.PROTECT)
  property = models.ForeignKey(Property, on_delete=models.PROTECT)