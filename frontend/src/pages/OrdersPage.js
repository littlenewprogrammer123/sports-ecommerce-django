import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../components/AuthProvider";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Fetch orders for the logged-in user
    API.get("orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to load orders:", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <section className="container my-5">
        <h2 className="text-center mb-4">My Orders</h2>
        <p className="text-center text-muted">
          Please sign in to view your orders.
        </p>
      </section>
    );
  }

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">My Orders</h2>

      {loading ? (
        <p className="text-center text-muted">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-muted">You don’t have any orders yet.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order.id} className="list-group-item mb-3 shadow-sm">
              {/* Order Header */}
              <div className="d-flex justify-content-between align-items-center">
                <h5>Order #{order.id}</h5>
                <span
                  className={`badge ${
                    order.status === "PAID"
                      ? "bg-success"
                      : order.status === "SHIPPED"
                      ? "bg-info text-dark"
                      : order.status === "CANCELLED"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-muted small mb-1">
                Placed on: {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="fw-bold mb-2">Total: ₹{order.total_price}</p>

              {/* Order Items */}
              {order.items && order.items.length > 0 && (
                <ul className="list-group mt-2">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>
                        {item.product?.name || "Deleted Product"} (x{item.quantity})
                      </span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
