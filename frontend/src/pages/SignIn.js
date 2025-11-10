import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Local states
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  /** Handle input changes */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /** Handle form submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      const res = await login({
        username: form.username,
        password: form.password,
      });

      if (res.ok) {
        navigate("/"); // Redirect on success
      } else {
        // Always show a friendly message, prefer backend message if available
        const errMsg =
          typeof res.error === "string"
            ? res.error
            : res.error?.detail ||
              res.error?.error ||
              "Invalid username or password";
        setError(errMsg);
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Sign In</p>

        {/* Show error if any */}
        {error && <div className="alert">{error}</div>}

        <form className="form" onSubmit={handleSubmit} autoComplete="on">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button className="sign" type="submit" disabled={formLoading}>
            {formLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
}

/** Styled components */
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: #0f172a;

  .form-container {
    width: 360px;
    border-radius: 0.75rem;
    background: #111827;
    padding: 2rem;
    color: #f3f4f6;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .form {
    margin-top: 1rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .input-group label {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    color: #9ca3af;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid #374151;
    background: #1f2937;
    padding: 0.75rem 1rem;
    color: #f3f4f6;
    font-size: 0.95rem;
    outline: none;
  }

  .input-group input:focus {
    border-color: #a78bfa;
  }

  .sign {
    width: 100%;
    background: #a78bfa;
    padding: 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 1rem;
    color: #111827;
    cursor: pointer;
  }

  .sign:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .alert {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;
