import React from "react";
import Sidebar from "../components/admin-sidebar/Sidebar";

const OrderAdmin = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div>
        <h1>order</h1>
      </div>
    </div>
  );
};

export default OrderAdmin;
