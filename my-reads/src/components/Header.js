import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import { useAuth } from "../auth/AuthContext";

import "./Header.css"

function Header() {
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
  const {logoutContext} = useAuth();
  const navigate = useNavigate();

  if (!isUserLoggedIn) {
    return null;
  }

  const handleLogout = async () => {
    logoutContext();
    const response = await axiosInstance.post("/users/logout");
    console.log(response);
    navigate("/login", { replace: true });
  };

  return (
  <Navbar expand="lg" className="custom-navbar">
    <Container>
      
      {/* LOGO */}
      <Navbar.Brand
        className="brand"
        onClick={() => navigate("/books")}
      >
        📚 MyReads
      </Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse>
        
        {/* NAV LINKS */}
        <Nav className="me-auto nav-links">
          <Nav.Link onClick={() => navigate("/books")}>
            Books
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/mybooks")}>
            My Books
          </Nav.Link>
        </Nav>

        {/* RIGHT SIDE */}
        <div className="nav-actions">
          <Button className="logout-btn" onClick={handleLogout}>
            Logout
          </Button>
        </div>

      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default Header;
