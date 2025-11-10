// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-dark text-white py-5">
      <div className="container py-5">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-lg-8">
            {/* Heading */}
            <h1 className="display-4 fw-bold">
              Gear Up for Victory with{" "}
              <span className="text-primary">Online Sports Shop 🏀⚽</span>
            </h1>

            {/* Subheading */}
            <p className="lead mt-3 text-light">
              Your one-stop destination for premium sports equipment and
              apparel. From cricket bats to football kits, get everything you
              need to{" "}
              <span className="fw-semibold text-primary">
                play harder and win bigger.
              </span>
            </p>

            {/* Call-to-Action Buttons */}
            <div className="mt-4 d-flex justify-content-center gap-3">
              {/* Shop Now → goes to products page */}
              <Link to="/products" className="btn btn-primary btn-lg px-4">
                Shop Now
              </Link>

              {/* Learn More → goes to our new Learn More page */}
              <Link to="/learn-more" className="btn btn-outline-light btn-lg px-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
