import React, { useState } from "react";
import Sidebar from "../../components/ProfileSidebar";
import PersonalData from "../../components/PersonalData";
import Biography from "../../components/Biography";
import Analytics from "../../components/Analytics";
import UserTable from "../../components/UserTable";
import Subscription from "../../components/Subscription";
import CompanyData from "../../components/CompanyData";
import BillingData from "../../components/BillingData";
import "./profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal-data");

  const renderContent = () => {
    switch (activeTab) {
      case "personal-data":
        return <PersonalData />;

      case "biography":
        return <CompanyData />;
      case "analytics":
        return <Analytics />;
      case "users":
        return <UserTable />;
      case "subscription":
        return <Subscription />;
      case "company-data":
        return <CompanyData />;
      case "billing-data":
        return <BillingData />;

      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar onTabChange={setActiveTab} />
      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default Profile;
