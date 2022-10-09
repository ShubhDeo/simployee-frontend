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
        <br />

        <div className="text-center">
          <div className="Left" >
            <h4> Employees</h4>
            <AddEmployee />
            <br />
            <Pagination />
          </div>

          {/* <div
            className="right"
            style={{ marginRight: "5%", marginTop: "5%", textAlign: "left" }}
          >
            <AdminLogo />
          </div> */}
        </div>
      </>
    </div>
  );
}

export default AdminDash;
