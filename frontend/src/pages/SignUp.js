// src/pages/SignUp.js
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await register({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      navigate("/"); // show profile menu immediately
    } else {
      setError(res.error?.error || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Create Account</p>
        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <button className="sign" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;                /* full height */
  background-color: #0f172a;        /* ✅ match SignIn page background */

  .form-container {
    width: 350px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .title {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .error {
    color: #f87171;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .form {
    margin-top: 1rem;
  }

  .input-group {
    margin-top: 0.75rem;
    font-size: 0.9rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
    outline: none;
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250, 1);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: rgba(167, 139, 250, 1);
    padding: 0.75rem;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 1.2rem;
    cursor: pointer;
  }

  .sign:hover {
    background-color: rgba(139, 92, 246, 1);
  }
`;
