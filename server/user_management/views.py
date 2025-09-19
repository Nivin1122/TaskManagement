from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from core.settings import env
from rest_framework.decorators import api_view
from .serializers import CustomUserSerializer

# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data['access']
            refresh_token = response.data['refresh']

            response.set_cookie(
                key = env("COOKIES_TOKEN_KEY"),
                value = access_token,
                httponly = env("COOKIES_HTTPONLY")=="True",
                secure = env("COOKIES_SECURE")=="True",
                samesite = env("COOKIES_SAMESITE")
            )
            # Remove tokens from body
            response.data.pop('access')
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        refresh_token = request.data.get('refresh')
        if refresh_token is None:
            return Response({'error': 'No refresh token found'}, status = HTTP_400_BAD_REQUEST)
        
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data['access']
            response.set_cookie(
                key = env("COOKIES_TOKEN_KEY"),
                value = access_token,
                httponly = env("COOKIES_HTTPONLY") == "True",
                secure = env("COOKIES_SECURE") == "True",
                samesite = env("COOKIES_SAMESITE")
            )
        response.data.pop('access')
        response.data["message"] = "Access token updated successfully"
        return response

@api_view(['POST'])
def register_view(request):
    if request.method == "POST":
        serializer = CustomUserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Registered successfully"})
        else:
            return Response(serializer.errors, status = HTTP_400_BAD_REQUEST)
