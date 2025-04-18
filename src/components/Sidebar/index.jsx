import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../../assests/img/logo-removebg-preview.png";
import "./sidebar.css";

const UserPanelItems = [
  {
    link: "/UserPanel/Home",
    icon: "fas fa-house",
    name: "Home",
  },
  {
    link: "/UserPanel/Search",
    icon: "fas fa-search",
    name: "Search",
  },
  {
    link: "/UserPanel/Details",
    icon: "fas fa-clipboard",
    name: "Details",
  },
  {
    link: "/UserPanel/Alert",
    icon: "fas fa-bell",
    name: "Alert",
  },
  {
    link: "/UserPanel/Exposes",
    icon: "fas fa-paper-plane",
    name: "Exposes",
  },
  {
    link: "/UserPanel/FavouritePage",
    icon: "fas fa-heart",
    name: "Favourite",
  },
  {
    link: "/UserPanel/Profile",
    icon: "fa-solid fa-user",
    name: "Profile",
  },
  {
    link: "/UserPanel/Exposes-External",
    icon: "fa-solid fa-question-circle",
    name: "Exposes External",
  },
];

// Agent Panel Links
const AgentPanelItems = [
  {
    link: "/AgentPanel/Search",
    icon: "fas fa-search",
    name: "Search",
  },
  {
    link: "/AgentPanel/Exposes",
    icon: "fas fa-paper-plane",
    name: "Exposes",
  },
  {
    link: "/AgentPanel/History",
    icon: "fas fa-history",
    name: "History",
  },
  {
    link: "/AgentPanel/Transactions",
    icon: "fas fa-user-shield",
    name: "Handle",
  },
  {
    link: "/AgentPanel/Auth",
    icon: "fas fa-key",
    name: "Auth",
  },
  {
    link: "/AgentPanel/AllUser",
    icon: "fas fa-users",
    name: "All Users",
  },
];

// Client Panel Links
const ClientPanelItems = [
  {
    link: "/ClientPanel/Transactions",
    icon: "fa-solid fa-cart-shopping",
    name: "Transactions",
  },
  {
    link: "/ClientPanel/Search",
    icon: "fas fa-search",
    name: "Search",
  },
  {
    link: "/ClientPanel/Exposes",
    icon: "fa-solid fa-share-from-square",
    name: "Exposes",
  },
  {
    link: "/ClientPanel/Auth",
    icon: "fa-solid fa-info",
    name: "Info",
  },
];

const Sidebar = () => {
  const [iconSet, setIconSet] = useState(UserPanelItems);
  const location = useLocation();

  useEffect(() => {
    // Determine which panel should be shown based on the current path
    if (location.pathname.includes("ClientPanel")) {
      setIconSet(ClientPanelItems);
    } else if (location.pathname.includes("AgentPanel")) {
      setIconSet(AgentPanelItems);
    } else {
      setIconSet(UserPanelItems);
    }
  }, [location]);

  // Check if the current link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar-container">
      <Nav className="flex-column sidebar">
        {/* Logo */}
        <Nav.Item className="logo-container">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </Nav.Item>

        {/* Navigation items */}
        <div className="nav-items-container">
          <div>
            {iconSet.map((item, index) => (
              <Nav.Item key={index} className="sidebar-item">
                <Nav.Link 
                  as={Link} 
                  to={item.link} 
                  className={`sidebar-link ${isActive(item.link) ? 'active' : ''}`}
                >
                  <i className={`${item.icon} sidebar-icon`}></i>
                  <span className="sidebar-text">{item.name}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </div>

          {/* Logout */}
          <Nav.Item className="sidebar-item mt-auto">
            <Nav.Link as={Link} to="../signin" className="sidebar-link logout-link">
              <i className="fa-solid fa-right-from-bracket sidebar-icon"></i>
              <span className="sidebar-text">Log out</span>
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;