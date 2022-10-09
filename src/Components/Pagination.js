import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import Piechart from "./Piechart";
import { Barchart } from "./Barchart";
import DateTime from "./DateTime";
import axios from "axios";

const columns = [
  {
    dataField: "username",
    text: "Employee Name",
    sort: true,
  },
  {
    dataField: "email",
    text: "Email Id",
  },
  {
    dataField: "contact",
    text: "Contact",
  },
];

export default function App({ employees, setEmployees,selected,setSelected,nonSelected,setNonSelected }) {
  const data = [
    {
      id: "break",
      label: "break",
      value: 250,
      color: "hsl(227, 70%, 50%)",
    },
    {
      id: "meeting",
      label: "meeting",
      value: 412,
      color: "hsl(130, 88%, 51%)",
    },
    {
      id: "work",
      label: "work",
      value: 353,
      color: "hsl(4, 94%, 49%)",
    },
  ];

  const data2 = [
    {
      "Task Type": "Not Working",
      "Total Minutes": 183,
      "Total MinutesColor": "hsl(294, 70%, 50%)",
    },
    {
      "Task Type": "Working",
      "Total Minutes": 179,
      "Total MinutesColor": "hsl(64, 70%, 50%)",
    },
    {
      "Task Type": "Meetings",
      "Total Minutes": 145,
      "Total MinutesColor": "hsl(222, 70%, 50%)",
    },
  ];

  const [modalInfo, setModalInfo] = useState([]);
  // const [selected, setSelected] = useState(null);
  // const [nonSelected, setNonSelected] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      setShow(true);
    },
  };

  const handleSelect = async (e) => {
    console.log(e);
    await axios.put(
      `${process.env.REACT_APP_BACKEND_BASE}/api/user/deactivate/${e._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // let data = response.data;
    let selectedArray = selected.slice(0);
    let nonSelectedArray = nonSelected.slice(0);
    let employeesArray = employees.slice(0);

    let selectedArrayTemp = [];
    selectedArray.map((selected, index) => {
      if (index === e.id) selectedArrayTemp.push(index);
      return null;
    });

    employeesArray.map((employee) => {
      if (employee.id === e.id) employee.isActivated = false;
      return null;
    });

    console.log(employeesArray);
    nonSelectedArray.push(e.id);
    setNonSelected(nonSelectedArray);
    setSelected(selectedArrayTemp);
    setEmployees(employeesArray);
  };

  useEffect(() => {
    if (employees) {
      let selectedArray = [];
      let nonSelectedArray = [];
      employees.map((employee, index) => {
        // console.log(localStorage.getItem("id"), employee._id);
        if (employee.isActivated && localStorage.getItem("id") !== employee._id)
          selectedArray.push(index);
        else nonSelectedArray.push(index);
        return null;
      });
      setSelected(selectedArray);
      setNonSelected(nonSelectedArray);
    }
  }, [employees]);

  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select Date
          <br />
          <br />
          <DateTime val="pagination" value="pagination" />
          {/* Pie Chart */}
          <div style={{ display: "flex" }}>
            <div style={{ height: "40vh", width: "50%" }}>
              <Piechart data={data} />
            </div>
            <div style={{ height: "40vh", width: "50%" }}>
              <Piechart data={data} />
            </div>
          </div>
          {/* Bar Chart */}
          <div style={{ height: "40vh", width: "100%" }}>
            <Barchart data={data2} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div style={{ marginRight: "2%", marginLeft: "2%" }}>
      {employees && selected && nonSelected && (
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={employees}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
          rowEvents={rowEvents}
          selectRow={{
            selectColumnPosition: "right",
            selected: selected,
            nonSelectable: nonSelected,
            mode: "checkbox",
            onSelect: handleSelect,
          }}
        />
      )}
      {employees && show && selected ? <ModalContent /> : null}
    </div>
  );
}
