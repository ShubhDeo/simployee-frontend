import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import Piechart from "./Piechart";
import { Barchart } from "./Barchart";
import DateTime from "./DateTime";

export const Pagination = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
  }
  return items;
};

const products = Pagination(100);

const columns = [
  {
    dataField: "id",
    text: "Employee Name",
    sort: true,
  },
  {
    dataField: "name",
    text: "Email Id",
  },
  {
    dataField: "price",
    text: "Contact",
  },
  {
    dataField: "price",
    text: "Status",
  },
  {
    dataField: "price",
    text: "",
  },
];

export default function App() {
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      setShow(true);
    },
  };

  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}  size = "lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          Select Date
          <br /><br />
          <DateTime val="pagination" value="pagination" />
          {/* Pie Chart */}
          <div style={{ display: "flex"}}>
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
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}
        rowEvents={rowEvents}
      />
      {show ? <ModalContent /> : null}
    </div>
  );
}
