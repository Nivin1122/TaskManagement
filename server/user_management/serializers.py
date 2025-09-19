from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['user_email', 'user_name', "password"]

    def validate_password(self, data):
        if len(data) >= 8:
            return data
        raise serializers.ValidationError("Password must have atleast 8 characters")

    def create(self, validated_data):
        user = CustomUser.objects.create(
            user_email = validated_data["user_email"],
            user_name = validated_data["user_name"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user