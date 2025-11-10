import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in → redirect to Sign In
    return <Navigate to="/signin" replace />;
  }

  return children;
}
