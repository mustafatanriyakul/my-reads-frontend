import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axiosInstance from "../common/axiosInstance";
import BookCard from "../common/BookCard";

import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axiosInstance.get("/books/all");

        console.log("Axios response: ", response);

        if (response.data.body.length > 0) {
          setBooks(response.data.body);
          console.log("All books fetched");
        } else {
          setBooks([]);
          console.log("No books fetched");
        }
      } catch (error) {
        console.log("Fetching error: ", error);
      }
    };

    fetchAllBooks();
  }, []);

  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container className="books-page mt-4">
      {/* HEADER */}
      <div className="books-header">
        <h2 className="page-title">All Books</h2>

        <Form.Control
          placeholder="Search books..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* BOOK GRID */}
      <Row className="g-4">
        {searchedBooks.length > 0 ? (
          searchedBooks.map((book) => (
            <Col md={4} lg={3} key={book.id}>
              <BookCard
                book={book}
                books={books}
                setBooks={setBooks}
                navigate={navigate}
              />
            </Col>
          ))
        ) : (
          <div className="empty-state">No books found</div>
        )}
      </Row>
    </Container>
  );
}

export default Books;
