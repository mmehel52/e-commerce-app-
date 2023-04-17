import React from "react";
import Sidebar from "../components/user-sidebar/Sidebar";

const UserDashboard = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default UserDashboard;
