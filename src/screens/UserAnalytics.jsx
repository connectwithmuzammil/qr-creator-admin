import React from "react";
import { Sidebar } from "../components";

const UserAnalytics = () => {
  return (
    <div className="qr-main-page user-analytics-page">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>User Analytics</h1>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
