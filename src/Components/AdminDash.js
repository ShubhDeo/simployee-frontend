import React, { useState } from "react";
import AdminLogo from "./AdminLogo";
import { Button, Alert, Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const AdminDash = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Row className="">
        <Col>
          <div className="Left">
            <h1
              style={{ marginLeft: "5%", marginTop: "4%", textAlign: "left" }}
            >
              Admin Dashboard
            </h1>

            <div className="d-flex">
              <h4
                style={{
                  marginLeft: "5%",
                  marginTop: "10%",
                  textAlign: "left",
                }}
              >
                Employees
              </h4>

            </div>

            <br />

            <Form>
              {["checkbox"].map((type) => (
                <div
                  key={`inline-${type}`}
                  className="mb-3"
                  style={{ marginLeft:"5%" }}
                >
                  <Form.Check
                    inline
                    label="Deactivate"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                </div>
              ))}
            </Form>
          </div>
        </Col>

        <Col>
          {" "}
          <div
            className="Right"
            style={{ marginLeft: "5%", marginTop: "20%", textAlign: "left" }}
          >
            <AdminLogo />
          </div>{" "}
        </Col>
      </Row>
    </div>
  );
};

export default AdminDash;
