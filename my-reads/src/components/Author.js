import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../common/axiosInstance";
import BookCard from "../common/BookCard";

function Author() {
  const [bookList, setBookList] = useState([]);

  const params = useParams();
  const authorId = params.authorId;

  const [authorName, setAuthorName] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [genres, setGenres] = useState([]);

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
          setBookList(response.data.body);
        } else {
          setBookList([]);
        }
      } catch (error) {
        console.log("Fetching Author Books error: ", error);
      }
    };

    fetchAuthorDetails();
    fetchAuthorBooks();
  }, [authorId]);

  return (
    <Container>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>{authorName}</Card.Title>
          <Card.Text>
            Born in {birthplace}
            <br />
            Genres: {genres.length > 0 ? genres.join(", ") : "—"}
          </Card.Text>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Books</h4>

      <Row>
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <Col md={4} lg={3} key={book.id} className="mb-4">
              <BookCard book={book} />
            </Col>
          ))
        ) : (
          <p>No books found</p>
        )}
      </Row>
    </Container>
  );
}

export default Author;
