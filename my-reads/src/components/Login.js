import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { loginContext } = useAuth();

  const fromPath = location.state?.from?.pathname || "/mybooks";

  const HandleLogin = async () => {
    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });
      console.log(response);

      loginContext();
      navigate(fromPath, { replace: true });

    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
          <h3 className="text-center mb-2">Login</h3>
          <p className="text-center text-muted mb-4">
            Login to continue reading
          </p>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={HandleLogin}
            >
              Login
            </Button>
          </Form>

          <div className="text-center">
            <span className="text-muted">Don’t have an account? </span>
            <Link to="/signup">Sign up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
