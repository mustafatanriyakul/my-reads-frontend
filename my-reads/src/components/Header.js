import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (!isUserLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Navbar>
      <Container>
        <Nav>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href={`/mybooks/${userId}`}>MyBooks</Nav.Link>
        </Nav>

        <Nav>
          <Button variant="outline-danger" onClick= {handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
