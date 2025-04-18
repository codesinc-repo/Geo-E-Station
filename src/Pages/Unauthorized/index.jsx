// Unauthorized.js
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to access this page.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default Unauthorized;
