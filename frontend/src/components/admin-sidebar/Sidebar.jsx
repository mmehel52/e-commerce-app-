import React, { useState } from "react";
import "./sidebar.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaShuttleVan,
  FaPencilAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Brand from "../../images/brand.png";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/users",
      name: "Kullanıcılar",
      icon: <FaUserAlt />,
    },
    {
      path: "/admin/category",
      name: "Kategoriler",
      icon: <FaThList />,
    },
    {
      path: "/admin/product",
      name: "Ürünler",
      icon: <FaShoppingBag />,
    },
    {
      path: "/admin/order",
      name: "Siparişler",
      icon: <FaPencilAlt />,
    },
    {
      path: "/admin/delivery",
      name: "Dağıtım",
      icon: <FaShuttleVan />,
    },
    {
      path: "/admin/analitic",
      name: "Tablolar",
      icon: <FaRegChartBar />,
    },

    {
      path: "/admin/review",
      name: "Yorumlar",
      icon: <FaCommentAlt />,
    },
  ];
  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="sidebar-top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            className="w-50"
            src={Brand}
            alt=""
            onClick={() => navigate("/")}
          />

          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="sidebar-bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidebar-link text-decoration-none"
            activeclassName="sidebar-active"
          >
            <div className="sidebar-icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="sidebar-link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="sidebar-main">{children}</main>
    </div>
  );
};

export default Sidebar;
