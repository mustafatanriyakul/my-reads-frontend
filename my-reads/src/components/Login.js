import React, { useState } from "react";

import { Button, Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const successfull_register_message = "User logged in successfully.";

  const navigate = useNavigate();

  const HandleLogin = () => {
    const RequestBody = {
      username: username,
      password: password,
    };

    fetch(`http://localhost:8080/users/login`, {
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

        if(data.message === successfull_register_message){
          const userId = data.body.id;

          localStorage.setItem("isUserLoggedIn", "true")
          localStorage.setItem("userId", userId)

          navigate(`/mybooks/${userId}`)
        }

        
      })
      .catch((error) => {
        console.error("Login error", error);
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
