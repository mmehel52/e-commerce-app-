import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Google from "../images/google.png";
import Brand from "../images/brand2.png";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(Store);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/api/users/signin`,

        {
          email,
          password,
        }
      );
      setLoading(false);
      toast.success("you are sign in succesfully");
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      toast.error(getError(err));
      setLoading(false);
    }
  };
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BASE_URI}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="row h-100 w-100 ">
      <div className=" pt-5 d-flex flex-column  align-self-center px-5 col-sm-5 col-md-4 col-lg-3">
        <img src={Brand} className="w-50 mb-5 align-self-center" alt="" />
        <h1 className="mb-5 align-self-center">SIGN IN</h1>
        <div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 " controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="fs-4"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="please enter email..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="fs-4"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="please enter password..."
              />
            </Form.Group>

            <div className="my-5 d-flex flex-column gap-2 justify-content-center">
              <Button type="submit" size="lg" className="bg border-0">
                {loading ? (
                  <>
                    <LoadingBox />
                  </>
                ) : (
                  "Signin"
                )}
              </Button>
              <Button
                size="lg"
                className="d-flex flex-row justify-content-center gap-3 bg border-0"
              >
                <img
                  src={Google}
                  alt="google icon"
                  onClick={googleAuth}
                  className="brand-image"
                />
                <p className="align-self-center">Google</p>
              </Button>
            </div>
          </Form>
        </div>
        <div className="d-flex flex-column p-5  align-items-center">
          <div className="mb-3" style={{ fontSize: "12px" }}>
            Do You Forget Password?{" "}
            <span
              className="text-primary cursor"
              onClick={() => navigate("/forget-password")}
            >
              Reset Password
            </span>
          </div>
          <div className="mb-3" style={{ fontSize: "12px" }}>
            Don't You Have Acount?{" "}
            <span className="text-primary cursor" onClick={handleShow}>
              Sign Up
            </span>
          </div>
          <Signup
            show={show}
            onHide={() => setShow(false)}
            handleClose={handleClose}
          />
        </div>
      </div>
      <div className=" col-sm-7 col-md-8 col-lg-9 vh-100 px-0">
        <img
          src="https://cdn.pixabay.com/photo/2016/10/05/13/11/cloth-1716632_960_720.jpg"
          className="h-100 w-100 "
          alt=""
        />
      </div>
    </div>
  );
};

export default Signin;
