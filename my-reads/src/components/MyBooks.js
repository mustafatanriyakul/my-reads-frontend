import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";

import axiosInstance from "../common/axiosInstance";
import { updateBookStatus } from "../common/CommonUtils";

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
    switch (status) {
      case "TO_READ":
        return "want to read";
      case "CURRENTLY_READING":
        return "currently reading";
      case "READ":
        return "read";

      default:
        return status;
    }
  };

  const handleStatusUpdate = (bookId, newStatus) => {
    setMyBooks((prev) =>
      prev.map((book) =>
        book.bookId === bookId ? { ...book, status: newStatus } : book,
      ),
    );
  };

  return (
    <Container>
      <h2 className="mb-4">My Books</h2>

      <Card className="mb-2 shadow-sm">
        <Card.Body>
          <Row className="fw-bold text-muted">
            <Col md={1} /> {/* cover kolonu için boş header */}
            <Col md={3}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("bookTitle")}
              >
                Title {renderSortIcon("bookTitle")}
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("authorName")}
              >
                Author {renderSortIcon("authorName")}
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("status")}
              >
                Status {renderSortIcon("status")}
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("dateRead")}
              >
                Date Read {renderSortIcon("dateRead")}
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="link"
                className="p-0 fw-bold"
                onClick={() => handleSort("dateAdded")}
              >
                Date Added {renderSortIcon("dateAdded")}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {myBooks.map((userBook) => (
        <Card
          key={userBook.id}
          className="mb-2 shadow-sm"
          style={{ cursor: "pointer" }}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col md={1}>
                {userBook.coverImageBase64 ? (
                  <img
                    src={`data:${userBook.coverImageType};base64,${userBook.coverImageBase64}`}
                    alt={userBook.bookTitle}
                    style={{
                      width: "40px",
                      height: "56px",
                      objectFit: "contain",
                      background: "#f8f9fa",
                      borderRadius: "3px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "40px",
                      height: "56px",
                      background: "#e9ecef",
                      borderRadius: "3px",
                    }}
                  />
                )}
              </Col>

              <Col md={3} className="fw-semibold">
                <Link to={`/books/${userBook.bookId}`}>
                  {userBook.bookTitle}
                </Link>
              </Col>
              <Col md={2}>
                <Link to={`/authors/${userBook.authorId}`}>
                  {userBook.authorName}
                </Link>
              </Col>
              <Col md={2}>
                {formatStatus(userBook.status)}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        updateBookStatus(
                          userBook.bookId,
                          "TO_READ",
                          handleStatusUpdate,
                        )
                      }
                    >
                      want to read
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() =>
                        updateBookStatus(
                          userBook.bookId,
                          "CURRENTLY_READING",
                          handleStatusUpdate,
                        )
                      }
                    >
                      currently reading
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() =>
                        updateBookStatus(
                          userBook.bookId,
                          "READ",
                          handleStatusUpdate,
                        )
                      }
                    >
                      read
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={2}>{userBook.dateRead || "—"}</Col>
              <Col md={2}>{userBook.dateAdded}</Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default MyBooks;
