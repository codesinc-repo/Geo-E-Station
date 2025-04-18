import React from "react";
import "./subscription.css"

const Subscription = () => {
  return (
    <div className="subscription-container">
      <div className="subscription-section">
        <h3 className="subscription-header">Subscription</h3>
        <p><strong>Member since:</strong> 02/10/2023</p>
        <p>
          <strong>Current plan:</strong> <span className="plan-highlight">Basic Plan up to 1 user</span>
        </p>
        <p>
          <strong>Users included in rate:</strong> 1 of 1 available - <span className="usage-highlight">100% used</span>. <a href="#" className="add-users-link">Add users</a>
        </p>
        <p>
          <strong>Additional user price:</strong> €16/month
        </p>
        <p>
          <strong>Additional users:</strong> 1
        </p>
        <p>
          <strong>Price:</strong> €99/month (VAT not included)
        </p>
        <p>
          <strong>Status:</strong> <span className="status-active">Active</span>
        </p>
        <p>
          <strong>Next invoice:</strong> 01/12/2024
        </p>
        <p>
          <strong>Payment method:</strong> VISA card 4766****9352 <a href="#" className="change-link">Change</a>
        </p>
      </div>

      <div className="change-plan-section">
        <h4 className="change-plan-header">Change your plan now: <span className="current-plan-highlight">current BASIC plan</span></h4>
        <p>You can add or remove users from your plan whenever you want.</p>
        <button className="change-plan-button">Change Plan</button>
      </div>

      
    </div>
  );
};

export default Subscription;
