# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

# Views
from shop.views import CategoryViewSet, ProductViewSet, OrderViewSet
from shop import auth_views   # ✅ custom authentication views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Routers: categories, products, orders
router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"products", ProductViewSet, basename="products")
router.register(r"orders", OrderViewSet, basename="orders")   # ✅ creation + listing

urlpatterns = [
    path("admin/", admin.site.urls),

    # All API endpoints (categories, products, orders)
    path("api/", include(router.urls)),

    # Authentication
    path("api/auth/register/", auth_views.RegisterAPIView.as_view(), name="auth-register"),
    path("api/auth/login/", auth_views.LoginAPIView.as_view(), name="auth-login"),

    # JWT (optional)
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# Serve media in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
