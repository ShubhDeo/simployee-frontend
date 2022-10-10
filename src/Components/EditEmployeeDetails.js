import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import DateTimeAdmin from "./DateTimeAdmin";
import axios from "axios";

const EditEmployeeDetails = ({ employeeDetails, setEmployeeDetails,employeeName,setEmployeeName }) => {
  const [show, setShow] = useState(false);
  //   const valueRef = useRef("add-employees");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selected, setSelected] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(employeeDetails.username);
  const [email, setEmail] = useState(employeeDetails.email);
  const [contact, setContact] = useState(employeeDetails.contact);
  const [dept, setDept] = useState(employeeDetails.department);
  const [joinDate, setJoinDate] = useState(employeeDetails.joiningDate);
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const handleSubmitEmployeePassword = async () =>{
    if(password!=confirmPassword || password<6){
      alert("Password do not match")
      return;
    }
    try {
      let response = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE}/api/user/${employeeDetails._id}`,
        {
          password:password
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      localStorage.clear();

      navigate("/");
      // console.log(data);
      // setEmployeeName(data.username);
      handleClose();
    } catch (error) {
      alert(error)
    }
  }
  const handleSubmitEmployeeDetails = async () => {
    if(contact.toString().length!=10){
      alert("Wrong Number")
      return;
    }
    try {
      let response = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE}/api/user/${employeeDetails._id}`,
        {
          username: name,
          email: email,
          contact: contact,
          joiningDate: joinDate,
          department: dept,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      // console.log(data);
      setEmployeeName(data.username);
      handleClose();
    } catch (error) {
      alert(error)
    }
  };
  return (
    <>
      <Button
        variant="transparent"
        className="text-black"
        style={{ border: "none" }}
        onClick={handleShow}
      >
        Edit Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily: "Poppins", fontWeight: "bolder"}}>Edit Details</Modal.Title>
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
                    // id="outlined-password-input"
                    type={showPassword ? "text" : "password"}
                    // autoComplete="current-password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
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
                    // id="outlined-password-input"
                    type={showPassword ? "text" : "password"}
                    // autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
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
                    // id="outlined-multiline-static"
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
                    // id="outlined-multiline-static"
                    // label="Current Email"
                    value={employeeDetails.email}
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
                  {/* 1 Accounting
                  2 HR
                  3 Sales
                  4 Tech                  
                  */}
                  <br />
                  <TextField
                    // id="outlined-multiline-static"
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
                  <Form.Label>Department</Form.Label>
                  <br />
                  <Select
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
                  <DateTimeAdmin
                    joinDate={joinDate}
                    setJoinDate={setJoinDate}
                  />
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
          {selected == false ? (
            <Button variant="primary" onClick={handleSubmitEmployeeDetails}>
              Update Changes
            </Button>
          ) : (
            <></>
          )}
          {selected == true ? (
            <Button variant="primary" onClick={handleSubmitEmployeePassword}>
              Update Password
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditEmployeeDetails;
