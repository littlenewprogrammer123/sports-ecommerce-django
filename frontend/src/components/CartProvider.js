import React, { createContext, useState } from "react";

// Create context
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ Add item to cart
  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((i) => i.productId === item.productId);
      if (found) {
        // If already exists, update qty
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      // If new item, add it
      return [...prev, item];
    });
  }

  // ➖ Remove item completely
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }

  // 🔄 Update item quantity (directly set qty)
  function updateQty(productId, qty) {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId ? { ...i, qty } : i
        )
      );
    }
  }

  // 🗑 Clear cart
  function clearCart() {
    setCart([]);
  }

  // 🛒 Count of total items
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // 💰 Total cart value
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
