import React from "react";
import "./billing.css"

const BillingData = () => {
  return (
    <div className="billing-data-container">
      <h3 className="billing-data-header">Billing Data</h3>
      <form className="billing-form">
        <div className="form-row">
          <div className="form-group">
            <label>Company name</label>
            <input type="text" placeholder="Enter company name" />
          </div>
          <div className="form-group">
            <label>CIF</label>
            <input type="text" placeholder="Enter CIF" />
          </div>
          <div className="form-group">
            <label>Fiscal address</label>
            <input type="text" placeholder="Enter fiscal address" />
          </div>
        </div>
        <button type="submit" className="billing-data-button">
          KEEP
        </button>
      </form>

      <h4 className="invoices-header">Invoices</h4>
      <div className="invoices-section">
        <div className="filter-row">
          <input type="text" placeholder="Filter" className="filter-input" />
          <select>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Period</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>November 2024</td>
              <td>01-11-2024 / 30-11-2024</td>
              <td>
                <span className="action-icon">✔</span>
                <span className="action-icon">↺</span>
                <span className="action-icon">👁</span>
              </td>
            </tr>
            <tr>
              <td>October 2024</td>
              <td>01-10-2024 / 31-10-2024</td>
              <td>
                <span className="action-icon">✔</span>
                <span className="action-icon">↺</span>
                <span className="action-icon">👁</span>
              </td>
            </tr>
            <tr>
              <td>September 2024</td>
              <td>01-09-2024 / 30-09-2024</td>
              <td>
                <span className="action-icon">✔</span>
                <span className="action-icon">↺</span>
                <span className="action-icon">👁</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingData;
