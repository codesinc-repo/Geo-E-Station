import React, { useState } from "react";
import logo from "../../assests/img/logo-removebg-preview.png";
import "./signin.css";
import { Link } from "react-router-dom";

const Signin2 = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Deselect if already selected
          : [...prev, option] // Select if not already selected
    );
  };

  return (
    <>
      <img src={logo} className="___login-container" alt="Logo" />
      <div className="___container">
        <div className="___form-container shadow-sm">
          <h3 className="text-center mb-4">We're almost there</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                In which country do you work?
              </label>
              <select id="country" className="form-select">
                <option selected="">Spain</option>
                <option value={1}>USA</option>
                <option value={2}>Canada</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="province" className="form-label">
                In which province do you work?
              </label>
              <select id="province" className="form-select">
                <option selected="">Select...</option>
                <option value={1}>Province 1</option>
                <option value={2}>Province 2</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Your phone
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">The license is for</label>
              <div className="d-flex gap-2 flex-wrap">
                {["Autonomous", "Company"].map((option) => (
                  <span
                    key={option}
                    className={`___option-button ${
                      selectedOptions.includes(option) ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Which modules are you most interested in? (You can select
                multiple options)
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {[
                  "Catchment",
                  "Assessment",
                  "Market research",
                  "Web evaluator",
                ].map((option) => (
                  <span
                    key={option}
                    className={`___option-button ${
                      selectedOptions.includes(option) ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/Signindiscover">
              <button type="button" className="___btn-follow">
                Following
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin2;
