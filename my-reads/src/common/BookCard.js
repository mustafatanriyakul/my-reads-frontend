import { Link } from "react-router-dom";
import { Card, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { addToMyBooks, formatStatus, updateBookStatus } from "./CommonUtils";

import "./BookCard.css";

function BookCard({ book, books, setBooks, navigate }) {
  const handleStatusUpdate = (bookId, newStatus) => {
    const updatedBooks = books.map((b) =>
      b.id === bookId ? { ...b, status: newStatus } : b,
    );

    setBooks(updatedBooks);
  };

  return (
    <Card className="book-card h-100">
      {/* COVER */}
      <div className="book-cover-wrapper">
        {book.coverImageBase64 ? (
          <img
            src={`data:${book.coverImageType};base64,${book.coverImageBase64}`}
            alt={`${book.title} cover`}
            className="book-cover"
          />
        ) : (
          <div className="no-cover">No cover</div>
        )}
      </div>

      {/* BODY */}
      <Card.Body className="d-flex flex-column">
        <div className="book-info">
          <Link to={`/books/${book.id}`} className="book-title">
            {book.title}
          </Link>

          <Link to={`/authors/${book.authorId}`} className="book-author">
            {book.authorName}
          </Link>

          <div className="book-meta">
            <span>ISBN: {book.isbn || "—"}</span>
            <span>{book.datePublished || "—"}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="book-actions mt-auto">
          <Dropdown as={ButtonGroup} className="w-100">
            {!book.status ? (
              <Button
                variant="primary"
                className="action-btn"
                onClick={() => navigate(`/book-review/${book.id}`)}
              >
                Want to read
              </Button>
            ) : (
              <Button
                variant="secondary"
                className={`status-badge ALREADY`}
              >
                {formatStatus(book.status)}
              </Button>
            )}

            <Dropdown.Toggle split variant="primary" />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  book.status
                    ? updateBookStatus(book.id, "TO_READ", handleStatusUpdate)
                    : addToMyBooks(book.id, "TO_READ", handleStatusUpdate)
                }
                className={`status-badge TO_READ`}
              >
                Want to read
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() =>
                  book.status
                    ? updateBookStatus(
                        book.id,
                        "CURRENTLY_READING",
                        handleStatusUpdate,
                      )
                    : addToMyBooks(
                        book.id,
                        "CURRENTLY_READING",
                        handleStatusUpdate,
                      )
                }
                className={`status-badge CURRENTLY_READING`}
              >
                Currently reading
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item
                onClick={() => navigate(`/book-review/${book.id}`)}
                className={`status-badge READ`}
              >
                Read
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
