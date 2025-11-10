import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartProvider";
import { AuthContext } from "./AuthProvider";

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Online Sports Shop 🏀⚽
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/products" className="nav-link">Products</Link></li>
            <li className="nav-item"><Link to="/checkout" className="nav-link">Checkout</Link></li>
            <li className="nav-item"><Link to="/orders" className="nav-link">Orders</Link></li>
          </ul>

          <Link to="/checkout" className="btn btn-outline-light position-relative ms-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.56641 4C1.56641 3.58579 1.90219 3.25 2.31641 3.25H3.49696C4.61854 3.25 5.56885 4.07602 5.72504 5.18668L5.7862 5.62161H19.7507C21.3714 5.62161 22.4605 7.28344 21.8137 8.76953L19.1464 14.8979C18.789 15.719 17.9788 16.25 17.0833 16.25L7.72179 16.25C6.60021 16.25 5.6499 15.424 5.49371 14.3133L4.23965 5.39556C4.18759 5.02534 3.87082 4.75 3.49696 4.75H2.31641C1.90219 4.75 1.56641 4.41421 1.56641 4ZM5.99714 7.12161L6.9791 14.1044C7.03116 14.4747 7.34793 14.75 7.72179 14.75L17.0833 14.75C17.3818 14.75 17.6519 14.573 17.771 14.2993L20.4383 8.17092C20.6539 7.67556 20.2909 7.12161 19.7507 7.12161H5.99714Z"/>
              <path d="M6.03418 19.5C6.03418 18.5335 6.81768 17.75 7.78418 17.75C8.75068 17.75 9.53428 18.5335 9.53428 19.5C9.53428 20.4665 8.75078 21.25 7.78428 21.25C6.81778 21.25 6.03418 20.4665 6.03418 19.5Z"/>
              <path d="M16.3203 17.75C15.3538 17.75 14.5703 18.5335 14.5703 19.5C14.5703 20.4665 15.3538 21.25 16.3203 21.25C17.2868 21.25 18.0704 20.4665 18.0704 19.5C18.0704 18.5335 17.2868 17.75 16.3203 17.75Z"/>
            </svg>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="d-flex ms-3 align-items-center">
            {!isAuthenticated ? (
              <>
                <Link className="btn btn-light me-2" to="/signin">Sign In</Link>
                <Link className="btn btn-primary" to="/signup">Sign Up</Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}>
                  👤 {user?.profile?.username || user?.profile?.email}
                </button>

                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show mt-2">
                    <li>
                      <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        👤 My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        📦 My Orders
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
