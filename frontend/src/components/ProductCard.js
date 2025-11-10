import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ProductCard({
  productId,
  slug,
  name,
  price,
  oldPrice,
  image,
  description,
  onAddToCart,
}) {
  const navigate = useNavigate();

  // ✅ Handle Buy Now → add product + redirect
  const handleBuyNow = () => {
    if (onAddToCart) onAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm position-relative">
        {/* Product Image (clickable) */}
        <Link to={`/product/${slug || productId}`}>
          <img
            src={image}
            className="card-img-top"
            alt={name}
            style={{ height: "180px", objectFit: "cover" }}
          />
        </Link>

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          {/* Price */}
          <p className="mb-1 small">
            <span className="fw-bold text-dark">₹{price}</span>{" "}
            {oldPrice && (
              <span className="text-muted text-decoration-line-through">
                ₹{oldPrice}
              </span>
            )}
          </p>

          {/* Title (clickable) */}
          <Link
            to={`/product/${slug || productId}`}
            className="text-decoration-none text-dark"
          >
            <h6 className="fw-bold">{name}</h6>
          </Link>

          {/* Description */}
          <p className="text-muted small flex-grow-1 mb-3">
            {description
              ? description.slice(0, 80) + (description.length > 80 ? "..." : "")
              : "No description available."}
          </p>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-dark btn-sm flex-fill"
              onClick={onAddToCart}
            >
              🛒 Add to Cart
            </button>
            <button
              className="btn btn-dark btn-sm flex-fill"
              onClick={handleBuyNow}
            >
             Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
