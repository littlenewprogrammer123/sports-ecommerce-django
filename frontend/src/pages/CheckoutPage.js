import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartProvider";
import { AuthContext } from "../components/AuthProvider";
import API from "../api/api";

export default function CheckoutPage() {
  const { cart, removeFromCart, addToCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // Update quantity in cart
  const updateQuantity = (item, qty) => {
    if (qty < 1) return;
    removeFromCart(item.productId);
    addToCart({ ...item, qty: Number(qty) });
  };

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const vat = subtotal * 0.1;
  const discount = subtotal > 500 ? 50 : 0;
  const total = subtotal + vat - discount;

  // ✅ Checkout → Send order to backend
  const handleCheckout = async () => {
    if (!user || !user.token) {
      alert("Please sign in to place an order.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        full_name: user.username,
        address: "Default Address",
        phone: "0000000000",
        total_price: Number(total.toFixed(2)),
        items: cart.map((item) => ({
          product_id: item.productId,
          quantity: Number(item.qty),
          price: Number(item.price),
        })),
      };

      const res = await API.post("orders/", orderData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Order created:", res.data);
      alert("✅ Your order is confirmed!");
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error);
      alert(
        `❌ Failed to place order. ${
          error.response?.data?.error || "Please check server logs."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <header className="text-center mb-4">
            <h1 className="h3 fw-bold">Your Cart</h1>
          </header>

          {cart.length === 0 ? (
            <p className="text-center text-muted">Your cart is empty 🛒</p>
          ) : (
            <>
              <ul className="list-unstyled">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="rounded"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />

                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">₹{item.price} each</small>
                    </div>

                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQuantity(item, e.target.value)}
                      className="form-control form-control-sm text-center"
                      style={{ width: "60px" }}
                    />

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="btn btn-sm btn-outline-danger ms-2"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-top pt-4 mt-4">
                <dl className="row mb-2">
                  <dt className="col-6">Subtotal</dt>
                  <dd className="col-6 text-end">₹{subtotal.toFixed(2)}</dd>

                  <dt className="col-6">VAT (10%)</dt>
                  <dd className="col-6 text-end">₹{vat.toFixed(2)}</dd>

                  <dt className="col-6">Discount</dt>
                  <dd className="col-6 text-end">-₹{discount.toFixed(2)}</dd>

                  <dt className="col-6 fw-bold">Total</dt>
                  <dd className="col-6 text-end fw-bold">₹{total.toFixed(2)}</dd>
                </dl>

                <div className="text-end">
                  <button
                    onClick={handleCheckout}
                    className="btn btn-dark px-4"
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Checkout"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
