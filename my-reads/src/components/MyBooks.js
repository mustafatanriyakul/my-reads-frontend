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
import { updateBookStatus, formatStatus } from "../common/CommonUtils";

import "./MyBooks.css"

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
          console.log(response.data.body);
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
      let valueA = a[key];
      let valueB = b[key];

      if (key === "dateAdded" || key === "dateFinished") {
        valueA = valueA ? new Date(valueA).getTime() : null;
        valueB = valueB ? new Date(valueB).getTime() : null;

        if (valueA === null && valueB === null) return 0;
        if (valueA === null) return 1;
        if (valueB === null) return -1;

        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        const result = valueA.localeCompare(valueB);
        return direction === "asc" ? result : -result;
      }

      return 0;
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

  const handleStatusUpdate = (bookId, newStatus) => {
    setMyBooks((prev) =>
      prev.map((book) =>
        book.bookId === bookId ? { ...book, status: newStatus } : book,
      ),
    );
  };

  return (
  <Container className="mybooks-page mt-4">
    <h2 className="page-title">My Books</h2>

    {/* HEADER */}
    <div className="table-header">
      <Row className="align-items-center">
        <Col md={1}></Col>

        <Col md={3}>
          <button className="sort-btn" onClick={() => handleSort("bookTitle")}>
            Title {renderSortIcon("bookTitle")}
          </button>
        </Col>

        <Col md={2}>
          <button className="sort-btn" onClick={() => handleSort("authorName")}>
            Author {renderSortIcon("authorName")}
          </button>
        </Col>

        <Col md={2}>
          <button className="sort-btn" onClick={() => handleSort("status")}>
            Status {renderSortIcon("status")}
          </button>
        </Col>

        <Col md={2}>
          <button className="sort-btn" onClick={() => handleSort("dateFinished")}>
            Date Read {renderSortIcon("dateFinished")}
          </button>
        </Col>

        <Col md={2}>
          <button className="sort-btn" onClick={() => handleSort("dateAdded")}>
            Date Added {renderSortIcon("dateAdded")}
          </button>
        </Col>
      </Row>
    </div>

    {/* LIST */}
    <div className="book-list">
      {myBooks.length > 0 ? (
        myBooks.map((userBook) => (
          <div className="book-row" key={userBook.id}>
            <Row className="align-items-center">
              
              {/* COVER */}
              <Col md={1}>
                {userBook.coverImageBase64 ? (
                  <img
                    src={`data:${userBook.coverImageType};base64,${userBook.coverImageBase64}`}
                    alt={userBook.bookTitle}
                    className="book-thumb"
                  />
                ) : (
                  <div className="book-thumb placeholder" />
                )}
              </Col>

              {/* TITLE */}
              <Col md={3} className="fw-semibold">
                <Link to={`/books/${userBook.bookId}`} className="book-link">
                  {userBook.bookTitle}
                </Link>
              </Col>

              {/* AUTHOR */}
              <Col md={2}>
                <Link to={`/authors/${userBook.authorId}`} className="book-link muted">
                  {userBook.authorName}
                </Link>
              </Col>

              {/* STATUS */}
              <Col md={2}>
                <div className="status-cell">
                  <span className={`status-badge ${userBook.status}`}>
                    {formatStatus(userBook.status)}
                  </span>

                  <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      variant="light"
                      className="status-dropdown"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          updateBookStatus(userBook.bookId, "TO_READ", handleStatusUpdate)
                        }
                        className="status-badge TO_READ"
                      >
                        Want to read
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() =>
                          updateBookStatus(
                            userBook.bookId,
                            "CURRENTLY_READING",
                            handleStatusUpdate
                          )
                        }
                        className="status-badge CURRENTLY_READING"
                      >
                        Currently reading
                      </Dropdown.Item>

                      <Dropdown.Divider />

                      <Dropdown.Item
                        onClick={() =>
                          updateBookStatus(userBook.bookId, "READ", handleStatusUpdate)
                        }
                        className="status-badge READ "
                      >
                        Read
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>

              <Col md={2}>{userBook.dateFinished || "-"}</Col>
              <Col md={2}>{userBook.dateAdded}</Col>
            </Row>
          </div>
        ))
      ) : (
        <div className="empty-state">No books yet</div>
      )}
    </div>
  </Container>
);
};

export default MyBooks;
