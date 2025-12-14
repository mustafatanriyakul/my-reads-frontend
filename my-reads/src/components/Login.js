import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const successfull_register_message = "User logged in successfully.";

  const navigate = useNavigate();

  const HandleLogin = async () => {
    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });

      console.log("Response from backend:", response.data);

      if (response.data.message === successfull_register_message) {
        alert("Login successful");

        localStorage.setItem("isUserLoggedIn", "true");
        navigate("/mybooks");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Login</h1>

        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "400px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "400px" }}
            />
          </Form.Group>

          <Button variant="primary" onClick={HandleLogin}>
            Login
          </Button>
        </Form>

        <Link to="/signup"> Don't have an account?</Link>
      </div>
    </div>
  );
}

export default Login;
