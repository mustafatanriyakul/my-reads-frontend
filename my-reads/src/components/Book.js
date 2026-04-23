import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import { Card } from "react-bootstrap";

function Book() {
  const params = useParams();
  const bookId = params.bookId;

  const [bookTitle, setBookTitle] = useState("");
  const [authorId, setAuthorId] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookDatePublished, setBookDatePublished] = useState("");
  const [coverImageBase64, setCoverImageBase64] = useState(null);
  const [coverImageType, setCoverImageType] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosInstance.get(`/books/${bookId}`);
        const book = response.data.body;
        setBookTitle(book.title);
        setAuthorId(book.authorId);
        setAuthorName(book.authorName);
        setBookIsbn(book.isbn);
        setBookDatePublished(book.datePublished);
        setCoverImageBase64(book.coverImageBase64);
        setCoverImageType(book.coverImageType);
        
        console.log(response);
      } catch (error) {
        console.log("Fetching error: ", error);
      }
    };

    fetchBookDetails();
  });

  return (
    <Card className="h-100 shadow-sm">
      {coverImageBase64 ? (
        <Card.Img
          variant="top"
          src={`data:${coverImageType};base64,${coverImageBase64}`}
          alt={`${bookTitle} cover`}
          style={{ objectFit: "contain", height: "300px" }}
        />
      ) : (
        <div
          style={{
            height: "300px",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa",
          }}
        >
          No cover
        </div>
      )}
      <Card.Body>
        <Card.Title>{bookTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Link to={`/authors/${authorId}`}>{authorName}</Link>
        </Card.Subtitle>
        <Card.Text>
          ISBN: {bookIsbn}
          <br />
          Published: {bookDatePublished}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Book;
