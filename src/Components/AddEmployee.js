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
import DateTimeAdmin from "./DateTimeAdmin";

const AddEmployee = ({ employees, setEmployees }) => {
  const [show, setShow] = useState(false);
  //   const valueRef = useRef("add-employees");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  const [dept, setDept] = useState();
  const [joinDate, setJoinDate] = useState();


  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try{let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE}/api/user/add`,
      {
        username: name,
        email: email,
        contact: contact,
        password: password,
        department: dept,
        joiningDate: joinDate,
        isAdmin: false
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    let data = response.data;
    console.log(data);
    let tempData = await axios.get(`${process.env.REACT_APP_BACKEND_BASE}/api/user`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    tempData = tempData.data
    tempData.map((element,idx) => {
      element.id = idx
    });
    setEmployees(tempData);
    //console.log(employees)
    handleClose();
    alert("Employee added successfully")
    console.log("Employee added successfully")
  }
    catch(e){
      alert(e);
      handleClose()
    }
  };

  const [selected, setSelected] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Button variant="primary" className="text-black" onClick={handleShow}>
        Add Employees
      </Button>
      <Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employees</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <br />
              <TextField
                // label="Multiline"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setContact(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
              <Select
                id="employeeDepartment"
                fullWidth={true}
                value={dept}
                onChange={(e) => {
                  setDept(e.target.value);
                }}
              >
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
              <DateTimeAdmin joinDate={joinDate} setJoinDate={setJoinDate} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleAddEmployee} variant="primary">
              Add Employee
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};

export default AddEmployee;
