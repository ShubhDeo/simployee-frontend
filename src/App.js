import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from './pages/Employees/Employees';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees/:id" element={<Employees />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
