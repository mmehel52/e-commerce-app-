import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" pt-5 bg  d-flex flex-column">
      <div className="d-flex flex-row gap-5 w-50 mx-auto justify-content-center border-bottom pb-3">
        <Link to="/" className="text-decoration-none">
          Anasayfa
        </Link>
        <Link className="text-decoration-none ">Kariyer</Link>
        <Link className="text-decoration-none ">SSS</Link>
        <Link className="text-decoration-none ">Hakkımızda</Link>
      </div>
      <div className="mt-3 text-center">
        <p>© {new Date().getFullYear()}JuniusTech</p>
      </div>
    </div>
  );
};

export default Footer;
