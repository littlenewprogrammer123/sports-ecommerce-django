from django.contrib import admin
from .models import Category, Product, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "stock", "category", "created_at")
    list_filter = ("category", "created_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")
    ordering = ("-created_at",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ("product", "quantity", "price", "get_total")
    extra = 0
    can_delete = False

    def get_total(self, obj):
        return obj.get_total
    get_total.short_description = "Item Total"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "full_name", "total_price", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("full_name", "phone", "address")
    readonly_fields = ("created_at", "get_total")
    inlines = [OrderItemInline]
    ordering = ("-created_at",)

    def get_total(self, obj):
        return obj.get_total
    get_total.short_description = "Order Total"
