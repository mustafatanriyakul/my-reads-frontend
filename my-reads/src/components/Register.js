import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const HandleRegister = () => {
    const RequestBody = {
      username: username,
      password: password,
    };

    fetch(`http://localhost:8080/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(RequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);

        alert(data.message);
      })
      .catch((error) => {
        console.error("Register error", error);
      });
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
        <h1 style={{ textAlign: "center" }}>Register</h1>

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

          <Button variant="primary" onClick={HandleRegister}>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
