import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PropertyHeader = () => {
  return (
    <div className="container-fluid py-3 bg-light">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-md-6 col-12 d-flex align-items-center">
          <div>
            <h4 className="mb-1">Property for sale in Spain</h4>
            <p className="mb-0 text-muted">244,043 found</p>
          </div>
          <button className="btn btn-secondary btn-sm ms-3">
            + Show locations
          </button>
        </div>

        {/* Right Section */}
        <div className="col-md-6 col-12 text-md-end text-start mt-md-0 mt-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-bell"></i> Create Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
