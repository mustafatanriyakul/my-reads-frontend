import "./App.css";
import Books from "./components/Books";
import MyBooks from "./components/MyBooks";
import Author from "./components/Author";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Book from "./components/Book";
import BookReview from "./components/BookReview";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/books" element={<Books />} />
            <Route path="books/:bookId" element={<Book />} />
            <Route path="/mybooks" element={<MyBooks />} />
            <Route path="/authors/:authorId" element={<Author />} />
            <Route path="/book-review/:bookId" element={<BookReview />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
