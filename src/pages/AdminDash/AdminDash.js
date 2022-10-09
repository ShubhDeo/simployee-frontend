import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import AdminLogo from "../../Components/AdminLogo";
import AddEmployee from "../../Components/AddEmployee";
import axios from "axios";
import { useEffect } from "react";

function AdminDash() {
  useEffect(() => {
    const fetchEmployees = async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      data.map((employee, index) => {
        employee.id = index;
      });
      console.log(data);
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const [employees, setEmployees] = useState(null);
  return (
    <div className="App">
      <>
        <h1>Admin Dashboard</h1>
        <br />
        <div className="text-center">
          <div className="Left">
            <h4> Employees</h4>
            <AddEmployee value="add-employee-admin" />
            <br />
            <Pagination employees={employees} setEmployees={setEmployees} />
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminDash;
