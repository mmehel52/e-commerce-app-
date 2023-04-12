import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import Google from "../images/google.png";
import Brand from "../images/brand2.png";

const Signup = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/api/users/signup`,
        {
          name,
          email,
          password,
        }
      );
      setLoading(false);
      toast.success(data.message);
      handleClose();
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
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Header className="p-5 m-auto ">
        <Modal.Title className="d-flex flex-column align-items-center">
          <img src={Brand} className="w-25" alt="" />
          <h1>SIGN UP</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              className="fs-4"
              required
              placeholder="please enter name..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="fs-4"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="please enter email..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="fs-4"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="please enter password..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="fs-4"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="please enter password again..."
            />
          </Form.Group>
          <div className="my-5 d-flex flex-column gap-2 justify-content-center">
            <Button type="submit" size="lg" className="bg border-0">
              {loading ? (
                <>
                  <LoadingBox />
                </>
              ) : (
                "Signup"
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
      </Modal.Body>
      {/* <Modal.Footer className="d-flex justify-content-center p-5">
        <div className="mb-3 " style={{ fontSize: "12px" }}>
          if you have account{" "}
        </div>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Signup;
