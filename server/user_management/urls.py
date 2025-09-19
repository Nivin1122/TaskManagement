from django.urls import path
from .views import register_view
from .views import CustomTokenObtainPairView, CustomTokenRefreshView

app_name = "user_management"

urlpatterns = [
    path("register/", register_view, name = "register"),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh')
]