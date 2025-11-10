// src/pages/ProductPage.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { CartContext } from "../components/CartProvider";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { slug } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔹 Fetch product + related items
  useEffect(() => {
    API.get(`products/${slug}/`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.category) {
          API.get(`products/?category=${res.data.category.slug}`).then(
            (catRes) => {
              const relatedProducts = catRes.data.filter(
                (p) => p.id !== res.data.id
              );
              setRelated(relatedProducts.slice(0, 4));
            }
          );
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [slug]);

  // 🔹 Add product to cart
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
      image: product.image || "https://via.placeholder.com/300",
    });
  };

  // 🔹 Buy now → add to cart + go to checkout
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (!product) {
    return <p className="text-center my-5">Loading product...</p>;
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          {/* Product Image */}
          <div className="col-lg-6 text-center mb-4 mb-lg-0">
            <img
              src={product.image || "https://via.placeholder.com/500"}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <h1 className="fw-bold">{product.name}</h1>
            <p className="text-muted fs-4 mb-3">₹{product.price}</p>
            <p>{product.description || "No description available."}</p>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center mb-4">
              <span className="me-3 fw-semibold">Quantity:</span>
              <div className="input-group" style={{ width: "120px" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={qty}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 mb-3">
              <button className="btn btn-dark btn-lg" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-outline-dark btn-lg" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            {/* Product Info */}
            <ul className="list-unstyled mt-4">
              <li>
                <strong>Category:</strong>{" "}
                {product.category?.name || "Uncategorized"}
              </li>
              <li>
                <strong>Status:</strong>{" "}
                {product.stock > 0 ? "In Stock ✅" : "Out of Stock ❌"}
              </li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-4">🔗 Related Products</h3>
            <div className="row">
              {related.map((rp) => (
                <ProductCard
                  key={rp.id}
                  productId={rp.id}
                  name={rp.name}
                  price={rp.price}
                  oldPrice={rp.oldPrice || null}
                  image={rp.image || "https://via.placeholder.com/200"}
                  description={rp.description || ""}
                  onAddToCart={() =>
                    addToCart({
                      productId: rp.id,
                      name: rp.name,
                      price: rp.price,
                      qty: 1,
                      image: rp.image,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
