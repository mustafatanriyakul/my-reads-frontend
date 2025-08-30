import "./App.css";
import Books from "./components/Books";
import MyBooks from "./components/MyBooks";
import Author from "./components/Author";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/books" element={<Books />} />
        <Route path="/mybooks/:userId" element={<MyBooks />} />
        <Route path="/authors/:authorId" element={<Author />} />
      </Routes>
    </div>
  );
}

export default App;
