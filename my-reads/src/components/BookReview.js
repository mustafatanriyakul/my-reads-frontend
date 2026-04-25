import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import axiosInstance from "../common/axiosInstance";

function BookReview() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [book, setBook] = useState(location.state || null);
  const [dateStarted, setDateStarted] = useState("");
  const [dateFinished, setDateFinished] = useState("");

  useEffect(() => {
    if (!book) {
      const fetchBook = async () => {
        try {
          const response = await axiosInstance.get(`/books/${bookId}`);
          setBook(response.data.body);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBook();
    }
  }, [book, bookId]);

  const submit = async () => {
    try {
      await axiosInstance.post("/mybooks/review", {
        bookId,
        dateStarted,
        dateFinished,
      });

      navigate("/mybooks");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <Container style={{ maxWidth: "600px" }}>
      <h3 className="page-title">Review</h3>

      {book && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3}>
                {book.coverImageBase64 ? (
                  <img
                    src={`data:${book.coverImageType};base64,${book.coverImageBase64}`}
                    alt={book.title}
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "120px",
                      background: "#e9ecef",
                    }}
                  />
                )}
              </Col>

              <Col md={9}>
                <h5>{book.title}</h5>
                <p className="text-muted mb-1">{book.authorName}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Form */}
      <Card className="shadow-sm">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={dateStarted}
                onChange={(e) => setDateStarted(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Finish Date</Form.Label>
              <Form.Control
                type="date"
                value={dateFinished}
                onChange={(e) => setDateFinished(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" onClick={submit}>
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookReview;