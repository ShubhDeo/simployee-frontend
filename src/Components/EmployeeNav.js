import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PopupForm from "./PopupForm";
import Button from "react-bootstrap/Button";
import "../pages/Employees/Employee.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import EditEmployeeDetails from "./EditEmployeeDetails";
import { useEffect } from "react";
import AddTask from "./AddTask";

function EmployeeNav({
  id,
  employeeDetails,
  setEmployeeDetails,
  employeeName,
  setEmployeeName,
  employeeInfoToday,
  setEmployeeInfoToday,
  employeeInfoPrevious,
  setEmployeeInfoPrevious,
  employeeInfoWeek,
  setEmployeeInfoWeek,
}) {
  const navigate = useNavigate();
  // console.log(employeeDetails.username)
  const handleClick = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <Navbar expand="lg" className="mb-5" id="nav">
      <Container>
        <Navbar.Brand href="#home" id="nav-text">
          Employee Dashboard
        </Navbar.Brand>
        <div id="nav-btn">
          <NavDropdown
            className="text-white"
            title={employeeName}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>
              <AddTask
                id={id}
                employeeInfoToday={employeeInfoToday}
                setEmployeeInfoToday={setEmployeeInfoToday}
                employeeInfoPrevious={employeeInfoPrevious}
                setEmployeeInfoPrevious={setEmployeeInfoPrevious}
                employeeInfoWeek={employeeInfoWeek}
                setEmployeeInfoWeek={setEmployeeInfoWeek}
              />
            </NavDropdown.Item>
            <NavDropdown.Item>
              <EditEmployeeDetails
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
                employeeDetails={employeeDetails}
                setEmployeeDetails={setEmployeeDetails}
              />
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Button
                onClick={handleClick}
                style={{ border: "none" }}
                variant="transparent"
                className="text-black"
              >
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default EmployeeNav;
