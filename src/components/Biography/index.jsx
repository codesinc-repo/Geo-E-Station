import React from "react";

const CompanyData = () => {
  return (
    <div className="company-data-container">
      <h3 className="company-data-header">Company Data</h3>
      <ul className="company-data-nav-tabs">
        <li className="company-data-nav-item">
          <a className="company-data-nav-link active" href="#company-data">
            COMPANY DATA
          </a>
        </li>
        <li className="company-data-nav-item">
          <a className="company-data-nav-link" href="#extra-info-report">
            EXTRA INFO REPORT
          </a>
        </li>
      </ul>
      <div className="company-data-form">
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter company name" />
            </div>
            <div className="form-group">
              <label>Contact phone number</label>
              <input type="text" placeholder="Enter phone number" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact email</label>
              <input type="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Web page</label>
              <input type="text" placeholder="Enter webpage URL" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Address</label>
              <input type="text" placeholder="Enter address" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="logo-upload">
                <img src="logo-placeholder.png" alt="Company Logo" />
                <p>Contact us to change the logo</p>
              </div>
            </div>
            <div className="form-group">
              <label>Corporate color</label>
              <input type="color" />
            </div>
          </div>
          <button type="submit" className="company-data-button">
            KEEP
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyData;
