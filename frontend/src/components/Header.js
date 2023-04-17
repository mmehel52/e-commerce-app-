import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { BiExit } from "react-icons/bi";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Brand from "../images/brand.png";
import { removeCookie } from "../cookies";

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  const signOut = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    logout();
    toast.success("you are sign out succesfully.");
    removeCookie("jwt");
    window.location.href = "/signin";
  };

  return (
    <header className=" w-100">
      <Navbar className="bg my-0" expand="lg">
        <Container className="px-5 ">
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex flex-row align-items-center gap-3">
              <img src={Brand} alt="" className="brand-image" />
              <h1>Terzim </h1>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            data-toggle="collapse"
            data-target="basic-navbar-nav"
            aria-controls="basic-navbar-nav"
            aria-expanded="false"
            label="Toggle navigation"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="  w-100  justify-content-end">
              <Link to="/card" className="nav-link">
                Sepet{" "}
                <Badge pill bg="danger">
                  {cart.cartItems.length}
                </Badge>
              </Link>
              {userInfo ? (
                <>
                  {" "}
                  <Link to="/user" className="nav-link">
                    {userInfo.name}
                  </Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin" className="nav-link">
                      Admin
                    </Link>
                  )}
                  <Link to="#signout" className="nav-link" onClick={signOut}>
                    <BiExit className="fs-1 " />
                  </Link>
                </>
              ) : (
                <>
                  <div className="d-flex flex-row justify-items-center text-light  cursor">
                    <Link to="/signin" className="nav-link">
                      Giriş
                    </Link>
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
