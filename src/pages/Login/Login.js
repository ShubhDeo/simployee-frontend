import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import "./Login.css";
import Card from "react-bootstrap/Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be atleast 6 characters long.");
      return;
    }
  };

  return (
    <div className="login" id="bg">
      <Card id="card">
        <div className="mb-5 p-3" id="content">
          <h1 className="text-center">Sign In</h1>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Group>
            <br />
            <Button className="mt-3 btn-block" type="submit" id="btn">Submit</Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
