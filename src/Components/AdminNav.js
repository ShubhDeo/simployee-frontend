import {useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PopupForm from "./PopupForm";
import Button from "react-bootstrap/Button";
import "../pages/AdminDash/AdminDash.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import EditEmployeeDetails from "./EditEmployeeDetails";
import AddEmployee from "../Components/AddEmployee";

function AdminNav({employees,setEmployees}) {
  const navigate=useNavigate();
  const handleClick=()=>{
    localStorage.clear()
    navigate("/");
  }
  return (
    <Navbar expand="lg" className="mb-5" id="a-nav">
      <Container>
        <Navbar.Brand href="#home" id="a-nav-text">
          Admin Dashboard
        </Navbar.Brand>
        <div id="nav-btn">
          <NavDropdown
            className="text-white"
            title={localStorage.getItem("username")}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>
            <AddEmployee employees={employees} setEmployees={setEmployees} />
            </NavDropdown.Item>
            
            <NavDropdown.Item>
              <Button onClick={handleClick} style={{border: "none"}} variant="transparent" className="text-black">
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
