import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DateTimeAddTask from "./DateTimeAddTask";
import axios from "axios";

const AddTask = ({
  employeeInfoToday,
  setEmployeeInfoToday,
  employeeInfoPrevious,
  setEmployeeInfoPrevious,
  employeeInfoWeek,
  setEmployeeInfoWeek,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [taskDescription, setTaskDescription] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [timeTaken, setTimeTaken] = useState(null);

  const handleSubmitAddTask = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE}/api/task/add`,
        {
          description: taskDescription,
          startTime: startTime,
          timeTaken: timeTaken,
          taskType: taskType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      let date=new Date();
      startTime.setUTCHours(0,0,0,0);
      date.setUTCHours(0,0,0,0);
      // console.log(startTime,date);
      let tempInfoWeek = employeeInfoWeek.slice(0);
      // console.log(tempInfoWeek);
      let timeWeekInfo = parseInt(tempInfoWeek[taskType - 1]["Total Minutes"]);
      // console.log(timeWeekInfo);
      tempInfoWeek[taskType - 1]["Total Minutes"] = timeWeekInfo+parseInt(timeTaken);
      setEmployeeInfoWeek(tempInfoWeek);
      if(date.getTime()===startTime.getTime()){
        let temp=employeeInfoToday.slice(0);
        // console.log(temp);
        // console.log(temp[taskType-1].value)
        temp[taskType-1].value++;
        // console.log(temp);
        setEmployeeInfoToday(temp);
      }
      else{
        let temp=employeeInfoPrevious.slice(0);
        // console.log(temp);
        temp[taskType-1].value++;
        // console.log(temp);
        setEmployeeInfoPrevious(temp);
      }
      handleClose();
      setTaskDescription(null);
      setTaskType(null);
      setStartTime(new Date());
      setTimeTaken(null);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Button
        variant="transparent"
        className="text-black"
        style={{ marginRight: "10px", border: "none" }}
        onClick={handleShow}
      >
        Add Tasks
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <br />
              <TextField
                onKeyUp={(e) => {
                  if (e.keyCode === 32) {
                    setTaskDescription(taskDescription + " ");
                  }
                }}
                value={taskDescription}
                onChange={(e) => {
                  e.preventDefault();
                  setTaskDescription(e.target.value);
                }}
                id="outlined-multiline-static"
                variant="outlined"
                // label="Multiline"
                multiline
                rows={4}
                fullWidth={true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Task Type</Form.Label>
              <br />
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={taskType}
                // label="Age"
                onChange={(e) => {
                  setTaskType(e.target.value);
                }}
                fullWidth={true}
              >
                <MenuItem value={1}>Break</MenuItem>
                <MenuItem value={2}>Meeting</MenuItem>
                <MenuItem value={3}>Work</MenuItem>
              </Select>
            </Form.Group>

            {/* DateTime */}
            <Form.Group className="mb-3">
              <Form.Label>Select Date and Start Time</Form.Label>
              <br />
              <DateTimeAddTask
                startTime={startTime}
                setStartTime={setStartTime}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Time taken to complete the task in minutes.
              </Form.Label>
              <br />
              <TextField
                // id="outlined-multiline-static"
                // label="Multiline"
                // multiline
                // rows={1}
                type={"number"}
                value={timeTaken}
                onChange={(e) => {
                  setTimeTaken(e.target.value);
                }}
                fullWidth={true}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAddTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;
