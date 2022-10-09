import {useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PopupForm from "./PopupForm";
import Button from "react-bootstrap/Button";
import "../pages/Employees/Employee.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import EditEmployeeDetails from "./EditEmployeeDetails";

function EmployeeNav() {
  const navigate=useNavigate();
  const handleClick=()=>{
    localStorage.clear()
    navigate("/");
  }
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
              <EditEmployeeDetails />
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Button onClick={handleClick} variant="transparent" className="text-black">
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
