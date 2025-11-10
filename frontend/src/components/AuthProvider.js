import React, { createContext, useEffect, useMemo, useState } from "react";
import API from "../api/api";

/**
 * AuthContext shape:
 * user:        full auth payload or null
 * isAuthenticated: true if logged in
 * initializing: true while reading localStorage at app startup
 * loginLoading: true only while a login or register request is running
 * login, register, logout: async auth functions
 */
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  initializing: true,
  loginLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Tracks first load (reading localStorage). Controls initial app render.
  const [initializing, setInitializing] = useState(true);

  // Tracks network activity during login/register requests only.
  const [loginLoading, setLoginLoading] = useState(false);

  /** Restore saved session on refresh before rendering the app */
  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.access && parsed?.profile) {
          setUser(parsed);
        }
      } catch {
        // If stored data is corrupted, clean it up
        localStorage.removeItem("auth");
      }
    }
    setInitializing(false);
  }, []);

  /** Save auth payload to localStorage and context */
  const persist = (payload) => {
    localStorage.setItem("auth", JSON.stringify(payload));
    setUser(payload);
  };

  /** Login user and persist session */
  const login = async ({ username, password }) => {
    setLoginLoading(true);
    try {
      const { data } = await API.post("auth/login/", { username, password });

      const payload = {
        access: data.access,
        refresh: data.refresh,
        profile: data.user,
        token: data.access,
        username: data.user.username,
        email: data.user.email,
        id: data.user.id,
      };

      persist(payload);
      return { ok: true, user: data.user };
    } catch (err) {
      // Capture a friendly error from backend if available
      const apiError =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";
      console.error("Login failed:", apiError);
      return { ok: false, error: apiError };
    } finally {
      setLoginLoading(false);
    }
  };

  /** Register a new user and persist session */
  const register = async ({ username, email, password }) => {
    setLoginLoading(true);
    try {
      const { data } = await API.post("auth/register/", {
        username,
        email,
        password,
      });

      const payload = {
        access: data.access,
        refresh: data.refresh,
        profile: data.user,
        token: data.access,
        username: data.user.username,
        email: data.user.email,
        id: data.user.id,
      };

      persist(payload);
      return { ok: true, user: data.user };
    } catch (err) {
      const apiError =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";
      console.error("Registration failed:", apiError);
      return { ok: false, error: apiError };
    } finally {
      setLoginLoading(false);
    }
  };

  /** Logout user and clear saved session */
  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  /** Memoized context value so re-renders only when needed */
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user?.access,
      initializing,
      loginLoading,
      login,
      register,
      logout,
    }),
    [user, initializing, loginLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when initial session check is done */}
      {initializing ? null : children}
    </AuthContext.Provider>
  );
}
