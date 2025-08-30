import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    fetch(`http://localhost:8080/mybooks/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.body) {
          setMyBooks(data.body);
          console.log(data)
        } else {
          setMyBooks([]);
        }
      })
      .catch((error) => console.error("Fetching error", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MyBooks</h1>


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
          {myBooks.length > 0 ? (
            myBooks.map((myBook) => (
              <tr key={myBook.id}>
                <td>{myBook.bookTitle}</td>
                <Link to = {`/authors/${myBook.authorId}`}>{myBook.authorName}</Link>
                <td>{myBook.dateRead}</td>
                <td>{myBook.dateAdded}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No myBook found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
