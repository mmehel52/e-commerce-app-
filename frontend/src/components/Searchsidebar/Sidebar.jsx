import React, { useState } from "react";
import "./sidebar.css";
import { FaBars, FaThList } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Brand from "../../images/brand.png";

const Sidebar = ({
  getFilterUrl,
  category,
  categories,
  rating,
  ratings,
  price,
  prices,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="search-sidebar-container">
      <div
        style={{ width: isOpen ? "200px" : "50px" }}
        className="search-sidebar"
      >
        <div className="search-sidebar-top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            className="w-50"
            src={Brand}
            alt=""
          />

          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="search-sidebar-bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>

        <div
          className="search-sidebar-link text-decoration-none"
          activeclassName="search-sidebar-active"
        >
          <div className="search-sidebar-icon">
            <FaThList />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="search-sidebar-link_text"
          >
            Kategoriler
          </div>
        </div>
        <div>
          <ul>
            <li>
              <NavLink
                style={{ display: isOpen ? "block" : "none" }}
                className={
                  category === "all"
                    ? "search-sidebar-active search-sidebar-link_text text-end px-2"
                    : "search-sidebar-link_text text-end px-2"
                }
                to={getFilterUrl({ category: "all" })}
              >
                Tümü
              </NavLink>
            </li>
            {categories.map((item) => (
              <li key={item._id}>
                <NavLink
                  style={{ display: isOpen ? "block" : "none" }}
                  className={
                    item.title === category
                      ? "search-sidebar-active search-sidebar-link_text text-end px-2"
                      : "search-sidebar-link_text text-end px-2"
                  }
                  to={getFilterUrl({ category: item.title })}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="search-sidebar-link text-decoration-none"
          activeclassName="search-sidebar-active"
        >
          <div className="search-sidebar-icon">
            <FaThList />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="search-sidebar-link_text"
          >
            Fiyat
          </div>
        </div>

        <div>
          <ul>
            <li>
              <NavLink
                style={{ display: isOpen ? "block" : "none" }}
                className={
                  "all" === price
                    ? "search-sidebar-active search-sidebar-link_text text-end px-2"
                    : "search-sidebar-link_text text-end px-2"
                }
                to={getFilterUrl({ price: "all" })}
              >
                Tümü
              </NavLink>
            </li>
            {prices.map((item) => (
              <li key={item.value}>
                <NavLink
                  style={{ display: isOpen ? "block" : "none" }}
                  className={
                    item.value === price
                      ? "search-sidebar-active search-sidebar-link_text text-end px-2"
                      : "search-sidebar-link_text text-end px-2"
                  }
                  to={getFilterUrl({ price: item.value })}
                >
                  {item.value}₺
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* <div
          className="search-sidebar-link text-decoration-none"
          activeclassName="search-sidebar-active"
        >
          <div className="search-sidebar-icon">
            <FaThList />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="search-sidebar-link_text"
          >
            Puan
          </div>
        </div> */}
        {/* <div>
          <ul>
            {ratings.map((r) => (
              <li key={r.name}>
                <NavLink
                  style={{ display: isOpen ? "block" : "none" }}
                  to={getFilterUrl({ rating: r.rating })}
                  className={
                    `${r.rating}` === `${rating}`
                      ? "search-sidebar-active search-sidebar-link_text text-end px-2"
                      : "search-sidebar-link_text text-end px-2"
                  }
                >
                  {r.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                style={{ display: isOpen ? "block" : "none" }}
                to={getFilterUrl({ rating: "all" })}
                className={
                  rating === "all"
                    ? "search-sidebar-active search-sidebar-link_text text-end px-2"
                    : "search-sidebar-link_text text-end px-2"
                }
              >
                Tümü
              </NavLink>
            </li>
          </ul>
        </div> */}
      </div>
      <main className="search-sidebar-main">{children}</main>
    </div>
  );
};

export default Sidebar;
