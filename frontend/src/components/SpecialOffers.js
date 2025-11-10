import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { CartContext } from "./CartProvider";
import { useNavigate, Link } from "react-router-dom";

export default function SpecialOffers() {
  const [offers, setOffers] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("products/")
      .then((res) => {
        // Sort by created_at and take latest 4
        const sorted = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOffers(sorted.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add product to cart
  const handleAddToCart = (product, discountedPrice) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: discountedPrice, // 30% OFF applied
      qty: 1,
      image: product.image || "https://via.placeholder.com/200",
    });
  };

  // ✅ Buy Now → add + go to checkout
  const handleBuyNow = (product, discountedPrice) => {
    handleAddToCart(product, discountedPrice);
    navigate("/checkout");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🔥 Special Offers – 30% OFF</h2>
      <div className="row">
        {offers.map((p) => {
          const discounted = (p.price * 0.7).toFixed(2);
          return (
            <div key={p.id} className="col-sm-6 col-md-3 mb-4">
              <div className="card h-100 border-0 shadow-sm position-relative">
                {/* Discount Badge */}
                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                  30% OFF
                </span>

                {/* Image → click to product page */}
                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.image || "https://via.placeholder.com/200"}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                </Link>

                {/* Body */}
                <div className="card-body d-flex flex-column text-center">
                  {/* Name → also clickable */}
                  <h6 className="fw-bold">
                    <Link
                      to={`/product/${p.id}`}
                      className="text-dark text-decoration-none"
                    >
                      {p.name}
                    </Link>
                  </h6>

                  <p className="mb-2">
                    <span className="text-success fw-bold">
                      ₹{discounted}
                    </span>{" "}
                    <span className="text-muted text-decoration-line-through">
                      ₹{p.price}
                    </span>
                  </p>

                  {/* Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-outline-dark btn-sm flex-fill"
                      onClick={() => handleAddToCart(p, discounted)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-dark btn-sm flex-fill"
                      onClick={() => handleBuyNow(p, discounted)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
