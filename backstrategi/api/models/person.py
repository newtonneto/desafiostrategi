from django.db import models
import datetime

class Person(models.Model):
  name = models.CharField(max_length=255)
  birth = models.DateField()

  GENDER_CHOICES = [
    (1, 'masculino'),
    (2, 'feminino'),
    (3, 'outro')
  ]

  gender = models.IntegerField(choices=GENDER_CHOICES, default=3)