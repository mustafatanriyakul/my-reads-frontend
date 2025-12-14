import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";

import axiosInstance from "../common/axiosInstance";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const response = await axiosInstance.get("/mybooks");

        console.log("Axios response:", response);

        if (response.data.body.length > 0) {
          setMyBooks(response.data.body);
        } else {
          setMyBooks([]);
          console.log("No mybooks fetched");
        }
      } catch (error) {
        console.log("Fetching error:", error);
      }
    };

    fetchMyBooks();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";

    if (sortKey === key && sortDirection === "asc") {
      direction = "desc";
    }

    setSortKey(key);
    setSortDirection(direction);

    const sortedBooks = [...myBooks].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (!valueA || !valueB) {
        return 0;
      }

      if (direction === "asc") {
        if (valueA > valueB) {
          return 1;
        } else if (valueA < valueB) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (valueA < valueB) {
          return 1;
        } else if (valueA > valueB) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    setMyBooks(sortedBooks);
  };

  const renderSortIcon = (key) => {
    if (sortKey !== key) {
      return null;
    }

    if (sortDirection === "asc") {
      return <FaSortUp className="ms-1" />;
    }

    return <FaSortDown className="ms-1" />;
  };

  const formatStatus = (status) => {
    switch(status){
      case "TO_READ":
        return "to read";
      case "CURRENTLY_READING":
        return "currently reading";
      case "READ":
        return "read";

      default:
        return status;
    }
  };

  return (
    <Container>
      <h2 className="mb-4">My Books</h2>

      <Card className="mb-2 shadow-sm">
        <Card.Body>
          <Row className="fw-bold text-muted">
            <Col md={3}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("bookTitle")}
              >
                Title
                {renderSortIcon("bookTitle")}
              </Button>
            </Col>

            <Col md={3}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("authorName")}
              >
                Author
                {renderSortIcon("authorName")}
              </Button>
            </Col>

            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("status")}
              >
                Status
                {renderSortIcon("status")}
              </Button>
            </Col>

            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("dateRead")}
              >
                Date Read
                {renderSortIcon("dateRead")}
              </Button>
            </Col>

            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("dateAdded")}
              >
                Date Added
                {renderSortIcon("dateAdded")}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {myBooks.length > 0 ? (
        myBooks.map((book) => (
          <Card
            key={book.id}
            className="mb-2 shadow-sm"
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <Row className="align-items-center">
                <Col md={3} className="fw-semibold">
                  {book.bookTitle}
                </Col>

                <Col md={3}>
                  <Link to={`/authors/${book.authorId}`}>
                    {book.authorName}
                  </Link>
                </Col>

                <Col md={2}>{formatStatus(book.status)}</Col>

                <Col md={2}>{book.dateRead || "—"}</Col>

                <Col md={2}>{book.dateAdded}</Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center mt-4">No books in your list</p>
      )}
    </Container>
  );
};

export default MyBooks;
