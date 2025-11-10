// src/pages/Home.js
import React, { useEffect, useState, useContext } from "react";
import Hero from "../components/Hero";
import SpecialOffers from "../components/SpecialOffers";
import ProductCard from "../components/ProductCard";
import Testimonials from "../components/Testimonials";
import API from "../api/api";
import { CartContext } from "../components/CartProvider";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get("products/")
      .then((res) => {
        // Shuffle & take 8 random products
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 8));
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Function to add product with correct details
  const handleAddToCart = (product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image || "https://via.placeholder.com/200",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Welcome Text */}
      <section className="text-center my-5">
        <h2>Welcome to Online Sports Shop 🏀⚽</h2>
        <p className="text-muted">
          Find the best sports gear and apparel to boost your game!
        </p>
      </section>

      {/* Special Offers Section */}
      <SpecialOffers />

      {/* Promotional Section */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="text-center text-white py-5 my-5"
      >
        <div className="container">
          <h2 className="fw-bold display-5">🔥 Latest Jerseys & Sportswear</h2>
          <p className="mt-3 mb-4 fs-5 text-light">
            Step into the game with our newest arrivals! From premium football
            jerseys ⚽ to high-performance cricket shirts 🏏 — grab yours now
            and play like a pro.
          </p>
          <a
            href="/products"
            className="btn btn-warning btn-lg fw-bold px-5 py-2"
          >
            Get Yours Today
          </a>
        </div>
      </section>

      {/* Most Sold Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">🏆 Most Sold Products</h2>
        <div className="row">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard
                key={p.id}
                productId={p.id}
                name={p.name}
                price={p.price}
                oldPrice={p.oldPrice || null}
                image={p.image || "https://via.placeholder.com/200"}
                description={p.description || "No description available."}
                onAddToCart={() => handleAddToCart(p)} // ✅ correct add
              />
            ))
          ) : (
            <p className="text-center">Loading popular products...</p>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
}
