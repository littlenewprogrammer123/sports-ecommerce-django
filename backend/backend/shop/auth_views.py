from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


# ✅ Register API
class RegisterAPIView(APIView):
    """
    Handles user registration and returns JWT tokens.
    """

    def post(self, request):
        # Safely extract and clean incoming data
        username = str(request.data.get("username", "")).strip()
        email = str(request.data.get("email", "")).strip()
        password = str(request.data.get("password", "")).strip()

        # Validation
        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already taken."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)

        # Issue tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "User registered successfully",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )


# ✅ Login API
class LoginAPIView(APIView):
    """
    Authenticates the user and returns JWT tokens.
    """

    def post(self, request):
        # Safely extract and clean incoming data
        username = str(request.data.get("username", "")).strip()
        password = str(request.data.get("password", "")).strip()

        # Validation
        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is None:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Issue tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )
