import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const param = useParams();
  const url = `${process.env.REACT_APP_BASE_URI}/api/password-reset/${param.id}/${param.token}`;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await Axios.post(url, {
        password,
      });
      navigate("/");
      setLoading(false);
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err));
      setLoading(false);
    }
  };

  return (
    <Container className="small-container d-flex flex-column align-items-center">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <h1 className="my-3">Reset Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" size="lg">
            {loading ? (
              <>
                <LoadingBox />
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
