import React from "react";
import logo from "../../assests/img/logo-removebg-preview.png";
import { Link } from "react-router-dom";

const Sidebar = ({ onTabChange }) => {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" />
      <ul>
        <Link to="/UserPanel">
          <li>
            <i class="fa-solid fa-map"></i>
          </li>
        </Link>
        <li onClick={() => onTabChange("personal-data")}>
          <i className="fas fa-user" title="Personal Data"></i>
        </li>
        <li onClick={() => onTabChange("biography")}>
          <i className="fas fa-book" title="Biography"></i>
        </li>
        <li onClick={() => onTabChange("analytics")}>
          <i className="fa-solid fa-chart-simple" title="Analytics"></i>
        </li>
        <li onClick={() => onTabChange("users")}>
          <i className="fas fa-users" title="Users"></i>
        </li>
        <li onClick={() => onTabChange("subscription")}>
          <i className="fas fa-euro-sign" title="Subscription"></i>
        </li>
        <li onClick={() => onTabChange("company-data")}>
          <i className="fas fa-building" title="Company Data"></i>
        </li>
        <li onClick={() => onTabChange("billing-data")}>
          <i className="fas fa-file-invoice" title="Billing Data"></i>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
