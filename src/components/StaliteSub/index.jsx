import React from "react";
import "./StaliteSub.css";

const StaliteSub = () => {
  return (
    <div className="container-fluid py-3 bg-light d-flex justify-content-between align-items-center">
      {/* Left Section */}
      <div className="d-flex align-items-center">
        <h1 className="header-title mb-0">Stalite Sub</h1>
        <span className="ms-3 text-muted">244,043 found</span>
        <span className="ms-3 text-muted">
          <strong>Spain</strong>
        </span>
        <button className="btn btn-secondary btn-sm ms-3">+ Show locations</button>
      </div>

      {/* Right Section */}
      <button className="btn btn-outline-primary d-flex align-items-center">
        <i className="bi bi-bell me-2"></i>
        Create Alert
      </button>
    </div>
  );
};

export default StaliteSub;
