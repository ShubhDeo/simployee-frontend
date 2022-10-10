import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=> {
     if(localStorage.getItem("token")!==null) {
      if (localStorage.getItem("isAdmin")===true) navigate("/admindash");
      else navigate(`/employees/${localStorage.getItem("id")}`);
     }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        alert("Password must be atleast 6 characters long.");
        return;
      }
      console.log(process.env.REACT_APP_BACKEND_BASE);
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
      localStorage.setItem("id", data._id);
      localStorage.setItem("isAdmin", data.isAdmin)
      localStorage.setItem("username", data.username);
      console.log(typeof data.isAdmin);
      if (data.isAdmin) navigate("/admindash");
      else navigate(`/employees/${data._id}`);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
      
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
            <Button className="mt-3 btn-block" type="submit" id="btn">
              Submit
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
