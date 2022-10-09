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

const EditEmployeeDetails = ({ value }) => {
  const [show, setShow] = useState(false);
  //   const valueRef = useRef("add-employees");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selected, setSelected] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Button variant="transparent" className="text-black" style={{border: "none"}} onClick={handleShow}>
        Edit Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

            {selected == true ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <TextField
                    id="outlined-password-input"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    fullWidth={true}
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
                  <Form.Label>Confirm Password</Form.Label>
                  <TextField
                    id="outlined-password-input"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    fullWidth={true}
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
              </>
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
                    id="outlined-multiline-static"
                    label="Current Email"
                    disabled={true}
                    // InputProps={{disableUnderline: true}}
                    // sx={{
                    //   "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                    //     WebkitTextFillColor: "white",
                    //   },
                    // }}
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
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditEmployeeDetails;
