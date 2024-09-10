import React from "react";
import {Sidebar} from "../components";

const HomeAdminDashboard = () => {
  return (
    <div className="qr-main-page">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
            <h1>ADMIN DASHBOARD</h1>
        </div>
      </div>
    </div>
  );
};

export default HomeAdminDashboard;
