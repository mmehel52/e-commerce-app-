import React from "react";
import Sidebar from "../components/admin-sidebar/Sidebar";

const CategoryAdmin = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div>
        <h1>Category</h1>
      </div>
    </div>
  );
};

export default CategoryAdmin;
