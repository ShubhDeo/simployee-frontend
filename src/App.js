import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login/Login";
import AdminDash from "./pages/AdminDash/AdminDash";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/" element={<Login />} />
          <Route path="/employees/:id" element={<Employees />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
