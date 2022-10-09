import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PopupForm from "./PopupForm";
import AddEmployee from "./AddEmployee";
import "../pages/Employees/Employee.css";
import NavDropdown from "react-bootstrap/NavDropdown";

function EmployeeNav() {
  return (
    <Navbar expand="lg" className="mb-5" id="nav">
      <Container>
        <Navbar.Brand href="#home" id="nav-text">
          Employee Dashboard
        </Navbar.Brand>
        <div id="nav-btn">
          <NavDropdown
            className="text-white"
            title={localStorage.getItem("username")}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>
              <PopupForm />
            </NavDropdown.Item>
            <NavDropdown.Item>
              <AddEmployee value={"employee-dashboard"} />
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default EmployeeNav;
