import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axiosInstance from "../common/axiosInstance";
import BookCard from "../common/BookCard";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


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
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <Container>
      <h2 className="mb-4">All Books</h2>

      <Form.Control
        placeholder="Search book title..."
        className="mb-4"
        style={{ maxWidth: "400px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Row>
        {searchedBooks.length > 0 ? (
          searchedBooks.map((book) => (
            <Col md={4} lg={3} key={book.id} className="mb-4">
              <BookCard book= {book}/>
            </Col>
          ))
        ) : (
          <p>No books found</p>
        )}
      </Row>
    </Container>
  );
}

export default Books;
