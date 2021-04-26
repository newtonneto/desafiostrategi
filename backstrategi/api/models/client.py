from django.db import models
import datetime

class Client(models.Model):
  name = models.CharField(max_length=255)
  birth = models.DateField()
  created_at = models.DateTimeField(auto_now_add=True)

  GENDER_CHOICES = [
    (1, 'masculino'),
    (2, 'feminino'),
    (3, 'outro')
  ]

  gender = models.IntegerField(choices=GENDER_CHOICES, default=3)