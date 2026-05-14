import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../common/axiosInstance";
import BookCard from "../common/BookCard";

import "./Author.css";

function Author() {
  const [books, setBooks] = useState([]);

  const params = useParams();
  const authorId = params.authorId;

  const [authorName, setAuthorName] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/authors/${authorId}`);
        setAuthorName(response.data.body.authorName);
        setBirthplace(response.data.body.birthplace);
        setGenres(response.data.body.genres);
      } catch (error) {
        console.log("Fetching Author Details error: ", error);
      }
    };

    const fetchAuthorBooks = async () => {
      try {
        const response = await axiosInstance.get(`/authors/${authorId}/books`);
        if (response.data.body) {
          setBooks(response.data.body);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.log("Fetching Author Books error: ", error);
      }
    };

    fetchAuthorDetails();
    fetchAuthorBooks();
  }, [authorId]);

  return (
    <Container className="mt-4 author-page">
      {/* Author Info */}
      <Card className="author-card mb-4">
        <Card.Body>
          <Card.Title className="author-name">{authorName}</Card.Title>

          <div className="author-meta">
            <span>📍 {birthplace || "Unknown"}</span>
          </div>

          <div className="author-genres">
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <span key={index} className="genre-badge">
                  {genre}
                </span>
              ))
            ) : (
              <span className="text-muted">No genres</span>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Books Section */}
      <div className="books-section">
        <h4 className="section-title">Books</h4>

        <Row className="g-4">
          {books.length > 0 ? (
            books.map((book) => (
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
      </div>
    </Container>
  );
}

export default Author;
