from django.db import models

class Property(models.Model):
  value = models.DecimalField(decimal_places=2, max_digits=11)
  street = models.CharField(max_length=255)
  number = models.CharField(max_length=4)
  district = models.CharField(max_length=255)
  zipcode = models.CharField(max_length=8)
  city = models.CharField(max_length=255)
  state = models.CharField(max_length=2)