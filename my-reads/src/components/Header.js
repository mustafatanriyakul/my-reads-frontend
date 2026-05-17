import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import { useAuth } from "../auth/AuthContext";

import "./Header.css";

function Header() {
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

  const { logoutContext } = useAuth();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  if (!isUserLoggedIn) {
    return null;
  }

  const handleLogout = async () => {
    logoutContext();

    const response = await axiosInstance.post("/users/logout");

    console.log(response);

    navigate("/login", { replace: true });
  };

  const handleSearch = async (value) => {
    console.log(value);

    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axiosInstance.get(`/books/search?query=${value}`);

      console.log(response);

      setSuggestions(response.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookClick = (bookId) => {
    setSearch("");
    setSuggestions([]);

    navigate(`/books/${bookId}`);
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand className="brand" onClick={() => navigate("/books")}>
          📚 MyReads
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto nav-links">
            <Nav.Link onClick={() => navigate("/books")}>Books</Nav.Link>

            <Nav.Link onClick={() => navigate("/mybooks")}>My Books</Nav.Link>
          </Nav>

          <div className="search-container">
            <Form.Control
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {suggestions.length > 0 && (
              <div className="search-dropdown">
                {suggestions.map((book) => (
                  <div
                    key={book.id}
                    className="search-item"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <img
                      src={`data:${book.coverImageType};base64,${book.coverImageBase64}`}
                      alt={`${book.title} cover`}
                      className="search-cover"
                    />

                    <div className="search-book-info">
                      <div className="search-book-title">{book.title}</div>

                      <div className="search-book-author">
                        by {book.authorName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
