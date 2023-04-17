import React from "react";
import Sidebar from "../components/admin-sidebar/Sidebar";

const ProductAdmin = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div>
        <h1>Product</h1>
      </div>
    </div>
  );
};

export default ProductAdmin;
