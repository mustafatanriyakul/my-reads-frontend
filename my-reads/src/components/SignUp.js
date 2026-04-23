import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const successfull_register_message = "User signed up.";
  const user_exists_message = "Username already exists.";

  const navigate = useNavigate();

  const HandleSignUp = async () => {
    try {
      const response = await axiosInstance.post("/users/signup", {
        username,
        password,
      });
      console.log(response)

      if (
        response.data.message === user_exists_message ||
        response.data.message === successfull_register_message
      ) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.fieldErrors);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card className="shadow-sm" style={{ width: "420px" }}>
        <Card.Body>
          <h3 className="text-center mb-2">Create Account</h3>
          <p className="text-center text-muted mb-4">
            Join MyReads and track your books 📚
          </p>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={HandleSignUp}
            >
              Sign Up
            </Button>
          </Form>

          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignUp;
