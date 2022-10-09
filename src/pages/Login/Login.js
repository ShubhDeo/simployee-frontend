import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import LoginLogo from "../../Components/LoginLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be atleast 6 characters long.");
      return;
    }
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/api/login`,
      {
        email: email,
        password: password,
      }
    );
    let data = response.data;
    console.log(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("id",data._id);
    console.log(typeof data.isAdmin);
    if (data.isAdmin) navigate("/admindash");
    else navigate(`/employees/${data._id}`);
  };

  return (
    <div className="login">
      <Row className="landing">
        <Col lg={4} md={6} xs={12} className="mb-5 p-3">
          <div>
            <h1>LOGIN</h1>
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
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Col>

        <Col lg={8} md={6} xs={12} className="mb-5 p-3">
          <LoginLogo />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
