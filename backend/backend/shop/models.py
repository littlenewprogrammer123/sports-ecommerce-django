# shop/models.py
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    """
    Product categories (e.g. Shoes, Jerseys, Accessories).
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Products available in the shop.
    """
    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Order(models.Model):
    """
    Customer order containing multiple items.
    Each order is linked to a single logged-in user.
    """
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PAID", "Paid"),
        ("SHIPPED", "Shipped"),
        ("CANCELLED", "Cancelled"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders",   # ✅ easy reverse lookup: user.orders.all()
    )
    full_name = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=30)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order #{self.id} - {self.full_name} ({self.status})"

    @property
    def get_total(self):
        """
        Sum of all items in this order.
        (Uses OrderItem.get_total for each item.)
        """
        return sum(item.get_total for item in self.items.all())


class OrderItem(models.Model):
    """
    Individual product inside an Order.
    Keeps a snapshot of price at the time of purchase.
    """
    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    # Important: enforce default and prevent null
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        product_name = self.product.name if self.product else "Deleted Product"
        return f"{self.quantity} × {product_name}"

    @property
    def get_total(self):
        """Return price × quantity safely (never crashes)."""
        return (self.price or 0) * (self.quantity or 0)
