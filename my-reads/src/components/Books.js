import React, { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/books/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.body) {
          setBooks(data.body);
        } else {
          setBooks([]);
        }
      })
      .catch((error) => console.error("Fetching error", error));
  }, []);

  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Books</h1>

      <input
        type="text"
        placeholder="Search.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px",  width: "300px" }}
      />

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Publish Date</th>
          </tr>
        </thead>
        <tbody>
          {searchedBooks.length > 0 ? (
            searchedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>{book.isbn}</td>
                <td>{book.datePublished}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
