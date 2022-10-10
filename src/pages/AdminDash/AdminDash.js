import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import AdminNav from "../../Components/AdminNav";
import AddEmployee from "../../Components/AddEmployee";
import axios from "axios";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

function AdminDash() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")===null) {
      navigate("/")
    }

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
  const [selected, setSelected] = useState(null);
  const [nonSelected, setNonSelected] = useState(null);
  


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
      console.log(selected);
      console.log(nonSelected);
    }
  }, [employees]);
  return (
    <div className="App" id="admin-bg">
      <>
        <AdminNav employees={employees} setEmployees={setEmployees} />
        <div className="text-center">
          <div className="Left">
            <h4> Employees</h4>
            <br />
            <Pagination
              employees={employees}
              setEmployees={setEmployees}
              selected={selected}
              setSelected={setSelected}
              nonSelected={nonSelected}
              setNonSelected={setNonSelected}
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminDash;
