import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import AdminLogo from "../../Components/AdminLogo";
import AddEmployee from "../../Components/AddEmployee";

function AdminDash() {
  return (
    <div className="App">
      <>
        <h1>Admin Dashboard</h1>

        <div className="d-flex">
          <div className="Left">
            <h4> Employees</h4>
            <Pagination />
            <AddEmployee />
          </div>

          <div className="right" style={{}}>
            <AdminLogo />
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminDash;
