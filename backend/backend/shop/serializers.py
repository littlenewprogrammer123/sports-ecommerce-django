# shop/serializers.py
from rest_framework import serializers
from .models import Category, Product, Order, OrderItem


# -------------------------
# Category Serializer
# -------------------------
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


# -------------------------
# Product Serializer
# -------------------------
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "image",
            "category",
        ]

    def get_image(self, obj):
        """Return absolute URL for product image."""
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url") and request:
            return request.build_absolute_uri(obj.image.url)
        return None


# -------------------------
# Order Item Serializer
# -------------------------
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price", "get_total"]
        read_only_fields = ["get_total"]


# -------------------------
# For creating order items (only product_id + quantity + price)
# -------------------------
class OrderCreateItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = OrderItem
        fields = ["product_id", "quantity", "price"]


# -------------------------
# Order Serializer (with nested items)
# -------------------------
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    get_total = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = [
            "id",
            "full_name",
            "address",
            "phone",
            "total_price",
            "status",
            "created_at",
            "items",
            "get_total",
        ]
        read_only_fields = ["status", "created_at", "get_total"]


# -------------------------
# Order Create Serializer (for checkout)
# -------------------------
class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderCreateItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["full_name", "address", "phone", "total_price", "items"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user  # ✅ pick up logged-in user
        order = Order.objects.create(user=user, **validated_data)
        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item["product_id"],
                quantity=item["quantity"],
                price=item["price"],
            )
        return order

