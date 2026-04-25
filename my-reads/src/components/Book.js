import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import {  } from "react-bootstrap";

import "./Book.css";

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
    <div className="book-page container mt-4">
      <div className="book-detail-card">
        <div className="row g-4">
          <div className="col-md-4">
            {coverImageBase64 ? (
              <img
                src={`data:${coverImageType};base64,${coverImageBase64}`}
                alt={`${bookTitle} cover`}
                className="book-cover"
              />
            ) : (
              <div className="no-cover">No cover</div>
            )}
          </div>

          <div className="col-md-8">
            <h2 className="book-title">{bookTitle}</h2>

            <Link to={`/authors/${authorId}`} className="book-author">
              {authorName}
            </Link>

            <div className="book-meta">
              <div>
                <strong>ISBN:</strong> {bookIsbn || "—"}
              </div>
              <div>
                <strong>Published:</strong> {bookDatePublished || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
