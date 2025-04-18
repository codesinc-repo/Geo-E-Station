import React from "react";
import logo from "../../assests/img/logo.png";
import "./2step.css";

const StepVerification = () => {
  return (
    <>
      <div className="__language-selector">
        <select className="__form-control" style={{ width: 150 }}>
          <option selected="">Spanish</option>
          <option>English</option>
        </select>
      </div>
      <div className="__header-logo">
        <img src={logo} alt="GeoEstate Logo" className="__logo" />
      </div>
      <div className="__form-container">
        <div className="__form-title">2 Step Verification</div>
        <form>
          <div className="__form-group">
            <label htmlFor="secretCode" className="__form-label">
              Enter Your Secret Code
            </label>
            <input
              type="password"
              id="secretCode"
              className="__form-control"
              placeholder="Secret Code"
              required
            />
          </div>
          <button type="button" className="__btn-green">
            Verify
          </button>
          <a href="#" className="__return-link">
            Send Again
          </a>
        </form>
      </div>
    </>
  );
};

export default StepVerification;
