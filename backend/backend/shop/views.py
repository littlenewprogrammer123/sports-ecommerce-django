# shop/views.py
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import transaction
from rest_framework import status, viewsets, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Category, Product, Order
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    OrderSerializer,
    OrderCreateSerializer,
)

# ------------------------------------------------------
# Category API – Public
# ------------------------------------------------------
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List or retrieve product categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ------------------------------------------------------
# Product API – Public
# ------------------------------------------------------
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all products or fetch a product by ID.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"   # fetch by ID instead of slug

    def get_serializer_context(self):
        # Include request so we can build absolute image URLs
        return {"request": self.request}


# ------------------------------------------------------
# Checkout / Create Order
# ------------------------------------------------------
class CreateOrderAPIView(APIView):
    """
    Protected: Create an order during checkout.
    """
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            # attach logged-in user to order
            order = serializer.save(user=request.user)
            return Response(
                OrderSerializer(order, context={"request": request}).data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------------------------------------
# Orders API – Protected
# ------------------------------------------------------
class OrderViewSet(viewsets.ModelViewSet):
    """
    Handle listing, retrieving and creating orders for the logged-in user.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        # Show only current user's orders
        return Order.objects.filter(user=self.request.user).order_by("-created_at")

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()   # ✅ removed user=request.user (serializer already does it)
        return Response(
            OrderSerializer(order, context={"request": request}).data,
            status=status.HTTP_201_CREATED
        )


# ------------------------------------------------------
# User Registration
# ------------------------------------------------------
class RegisterView(generics.CreateAPIView):
    """
    Register a new user and return JWT tokens.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username", "").strip()
        email = request.data.get("email", "").strip()
        password = request.data.get("password", "").strip()

        if not username or not password:
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_201_CREATED)


# ------------------------------------------------------
# User Login
# ------------------------------------------------------
class LoginView(APIView):
    """
    Authenticate a user and return JWT tokens.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username", "").strip()
        password = request.data.get("password", "").strip()

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)
