from django.db import models
from django.contrib.auth.models import User
import datetime

class Agent(models.Model):
  name = models.CharField(max_length=255)
  birth = models.DateField()
  created_at = models.DateTimeField(auto_now_add=True)
  user = models.OneToOneField(User, on_delete=models.CASCADE)

  GENDER_CHOICES = [
    (1, 'masculino'),
    (2, 'feminino'),
    (3, 'outro')
  ]

  gender = models.IntegerField(choices=GENDER_CHOICES, default=1)