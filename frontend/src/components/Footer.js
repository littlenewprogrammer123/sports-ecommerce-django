import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-white mb-3">📩 Get the latest news!</h5>
            <p className="text-secondary">
              Subscribe to our newsletter to stay updated with the latest
              sports gear, offers, and discounts.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2 bg-transparent text-light border-secondary"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-warning fw-bold">
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">1on1 Coaching</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Company Review</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">HR Consulting</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">SEO Optimisation</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Meet the Team</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Careers</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">Contact</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">FAQs</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Live Chat</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">Accessibility</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Returns Policy</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <p className="mb-2 mb-sm-0 text-secondary">
            © {new Date().getFullYear()} <span className="fw-bold text-white">Online Sports Shop</span>. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="d-flex gap-3">
            <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-light fs-5"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-light fs-5"><i className="bi bi-github"></i></a>
            <a href="#" className="text-light fs-5"><i className="bi bi-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
