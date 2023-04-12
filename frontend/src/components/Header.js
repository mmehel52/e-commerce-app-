import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFilePerson } from "react-icons/bs";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Brand from "../images/brand2.png";

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  const signOut = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    logout();
    toast.success("you are sign out succesfully.");
    window.location.href = "/signin";
  };

  return (
    <header>
      <Navbar className="bg" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={Brand} alt="" className="logo brand-image" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <SearchBox />
          <Nav className="me-auto  w-100  justify-content-end">
            <Link to="/cart" className="nav-link">
              Cart
              <Badge pill bg="danger">
                5
              </Badge>
            </Link>
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item nav-link"
                    to="#signout"
                    onClick={signOut}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
                <BsFilePerson className="fs-1 text-light" />
              </>
            ) : (
              <>
                <div className="d-flex flex-row justify-items-center text-light  cursor">
                  <BsFillPersonFill className="fs-1" />
                  <Link to="/signin" className="nav-link">
                    Signin
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
