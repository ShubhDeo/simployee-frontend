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
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";

const PopupForm = ({ value }) => {
  const [show, setShow] = useState(false);
  //   const valueRef = useRef("add-employees");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [selected, setSelected] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Employees
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {value === "employee-dashboard" ? "Edit Details" : "Add Employees"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {value === "employee-dashboard" ? (
              <Form.Group className="mb-3">
                <ToggleButton
                  value="check"
                  selected={selected}
                  onChange={() => {
                    setSelected(!selected);
                  }}
                  color="primary"
                >
                  Change Password
                </ToggleButton>
              </Form.Group>
            ) : (
              <></>
            )}
            {selected == false ? (
              <>
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
                id="employeeEmail"
                // InputProps={{disableUnderline: true}}
                // sx={{
                //   "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                //     WebkitTextFillColor: "white",
                //   },
                // }}
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                fullWidth={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>

              <br />
              <TextField
                id="employeeContact"
                type={"number"}
                // label="Multiline"
                value={contact}
                onChange={(e) => {setContact(e.target.value)}}
                fullWidth={true}
                
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <TextField
                id="employeePassword"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                fullWidth={true}
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <br />
              <Select id="employeeDepartment" fullWidth={true} value={dept} onChange={(e) => {setDept(e.target.value)}}>
                <MenuItem value={1}>Accounting</MenuItem>
                <MenuItem value={2}>Human Resource</MenuItem>
                <MenuItem value={3}>Sales</MenuItem>
                <MenuItem value={4}>Technology</MenuItem>
              </Select>
            </Form.Group>

                {/* DateTime */}
                <Form.Group className="mb-3">
                  <Form.Label>Joining Date</Form.Label>
                  <br />
                  <DateTime value="add-employee-admin" val={value} />
                </Form.Group>
              </>
            ) : (
              <></>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {value === "employee-dashboard" ? "Update Changes" : "Add Employee"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupForm;
