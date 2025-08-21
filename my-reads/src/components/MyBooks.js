import React, { useEffect, useState } from "react";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8080/mybooks/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.body) {
          setMyBooks(data.body);
        } else {
          setMyBooks([]);
        }
      })
      .catch((error) => console.error("Fetching error", error));
  }, [userId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MyBooks</h1>

      <input
        type="text"
        placeholder="userId.."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px",  width: "300px" }}
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
          {myBooks.length > 0 ? (
            myBooks.map((myBook) => (
              <tr key={myBook.id}>
                <td>{myBook.bookTitle}</td>
                <td>{myBook.authorName}</td>
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
