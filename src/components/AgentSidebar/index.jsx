import React from "react";
import logo from "../../assests/img/logo-removebg-preview.png";
import { Link } from "react-router-dom";
const AgentSidebar = () => {
  return (
    <div className="sidebar">
      <a href="agentpage.html">
        <img src={logo} />
      </a>
      <ul>
        <li>
          <Link to="/AgentPanel">
            <i className="fas fa-search" title="Search"></i>
          </Link>
        </li>
        <li>
          <Link to="/AgentExposes">
            <i className="fas fa-paper-plane" title="Exposes"></i>
          </Link>
        </li>
        <li>
          <Link to="/AgentHistory">
            <i className="fas fa-history" title="History"></i>
          </Link>
        </li>
        <li>
          <Link to="/AgenthandleBuyer">
            <i className="fas fa-user-shield" title="Handle"></i>
          </Link>
        </li>
        <li>
          <i class="fa-solid fa-address-book"></i>
        </li>
        <li>
          <Link to="/AgentAuth">
            <i className="fas fa-key" title="Auth"></i>
          </Link>
        </li>
      </ul>
      <div className="separator"></div>
      <li>
        <Link to="/Sign">
          <i className="fa-solid fa-right-from-bracket" title="Log out"></i>
        </Link>
      </li>
    </div>
  );
};

export default AgentSidebar;
