import { Link } from "react-router-dom";
import { Card, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { addToMyBooks } from "./CommonUtils";

function BookCard({ book }) {
  return (
    <Card className="h-100 shadow-sm">
      {book.coverImageBase64 ? (
        <Card.Img
          variant="top"
          src={`data:${book.coverImageType};base64,${book.coverImageBase64}`}
          alt={`${book.title} cover`}
          style={{ height: "200px", objectFit: "contain", padding: "8px" }}
        />
      ) : (
        <div
          style={{
            height: "200px",
            background: "#e9ecef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#adb5bd",
            fontSize: "0.85rem",
          }}
        >
          No cover
        </div>
      )}

      <Card.Body>
        <Card.Title>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Link to={`/authors/${book.authorId}`}>{book.authorName}</Link>
        </Card.Subtitle>

        <Card.Text style={{ fontSize: "0.9rem" }}>
          ISBN: {book.isbn}
          <br />
          Published: {book.datePublished}
        </Card.Text>

        <Dropdown as={ButtonGroup}>
          <Button
            variant="success"
            onClick={() => addToMyBooks(book.id, "TO_READ")}
          >
            want to Read
          </Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => addToMyBooks(book.id, "TO_READ")}>
              want to read
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => addToMyBooks(book.id, "CURRENTLY_READING")}
            >
              currently reading
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => addToMyBooks(book.id, "READ")}>
              read
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
