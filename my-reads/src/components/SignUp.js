import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const successfull_register_message = "User registered successfully.";
  const user_exists_message = "Username already exists.";

  const navigate = useNavigate();

  const HandleSignUp = async () => {
    try {
      const response = await axiosInstance.post("/users/signup", {
        username,
        password,
      });

      if (
        response.data.message === user_exists_message ||
        response.data.message === successfull_register_message
      ) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      setErrors(error.response.data);
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
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>

        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "400px" }}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "400px" }}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" onClick={HandleSignUp}>
            Sign Up
          </Button>
        </Form>

        <Link to="/login"> Already have an account?</Link>
      </div>
    </div>
  );
}

export default SignUp;
