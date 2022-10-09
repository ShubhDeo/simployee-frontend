import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DateTime from "./DateTime";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const PopupForm = () => {
  const [show, setShow] = useState(false);
  //   const valueRef = useRef("add-employees");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <br />
              <TextField
                id="outlined-multiline-static"
                // label="Multiline"

                fullWidth={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <br />
              <TextField
                id="outlined-multiline-static"
                // label="Multiline"

                fullWidth={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>

              <br />
              <TextField
                id="outlined-multiline-static"
                type={"number"}
                // label="Multiline"

                fullWidth={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <TextField
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                fullWidth={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <br />
              <Select fullWidth={true}>
                <MenuItem value={10}>Accounting</MenuItem>
                <MenuItem value={20}>Human Resource</MenuItem>
                <MenuItem value={30}>Sales</MenuItem>
                <MenuItem value={40}>Technology</MenuItem>
              </Select>
            </Form.Group>

            {/* DateTime */}
            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <br />
              <DateTime value="add-employee-admin" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupForm;
