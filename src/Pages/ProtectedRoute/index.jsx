import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Read authentication and role from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role");

  // Debugging: Log the current role and allowed roles
  console.log("Stored Role:", role);
  console.log("Allowed Roles for this Route:", allowedRoles);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/Sign" />;
  }

  if (!allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to Unauthorized page if the role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
