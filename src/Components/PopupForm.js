import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DateTime from "./DateTime";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const PopupForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                id="outlined-multiline-static"
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
                // value={age}
                // label="Age"
                // onChange={handleChange}
                fullWidth={true}
              >
                <MenuItem value={10}>Break</MenuItem>
                <MenuItem value={20}>Meeting</MenuItem>
                <MenuItem value={30}>Work</MenuItem>
              </Select>
            </Form.Group>

            {/* DateTime */}
            <Form.Group className="mb-3">
              <Form.Label>Select Date and Start Time</Form.Label>
              <br />
              <DateTime />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Time taken to complete the task in minutes.
              </Form.Label>
              <br />
              <TextField
                id="outlined-multiline-static"
                // label="Multiline"
                // multiline
                // rows={1}
                type={"number"}
                fullWidth={true}
              />
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
