from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'password', 'email']

    def create(self, validated_data):
      user = super().create(validated_data)
      user.set_password(validated_data['password'])
      user.save()
      return user

    def update(self, instance, validated_data):
      user = super().update(instance, validated_data)
      try:
        user.set_password(validated_data['password'])
        user.save()
      except KeyError:
        pass
      return user