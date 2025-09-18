from rest_framework_simplejwt.authentication import JWTAuthentication
from core.settings import env

class CookieJWTAuthentication(JWTAuthentication):
    def get_header(self, request):
        token = request.COOKIES.get(env("COOKIES_TOKEN_KEY"))
        if token:
            bearer_token = f"Bearer {token}".encode('utf-8')
            return bearer_token
        return None