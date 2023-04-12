import React from "react";
import { Link } from "react-router-dom";
import Tick from "../images/success.png";

const EmailVerify = () => {
  return (
    <div className="d-flex flex-column align-items-center mt-5 pt-5">
      <img src={Tick} alt="" className="mb-3" />
      <p>Your email is verified.Thank you...</p>
      <p>
        Please <Link to="/signin">Signin</Link>...
      </p>
    </div>
  );
};

export default EmailVerify;
