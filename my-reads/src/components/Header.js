import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import { useAuth } from "../auth/AuthContext";

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
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand style={{ fontWeight: "bold" }}>📚 MyReads</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/mybooks">My Books</Nav.Link>
          </Nav>

          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
