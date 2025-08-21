import React, { useEffect, useState } from "react";

function Author() {
  const [bookList, setBookList] = useState([]);
  const [authorId, setAuthorId] = useState(8);

  useEffect(() => {
    fetch(`http://localhost:8080/authors/${authorId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.body) {
          setBookList(data.body);
        } else {
          setBookList([]);
        }
      })
      .catch((error) => console.error("Fetching error", error));
  }, [authorId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Author</h1>

      <input
        type="text"
        placeholder="authorId.."
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      ></input>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date Read</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {bookList.length > 0 ? (
            bookList.map((book) => (
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
                No book found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Author;
