import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from './pages/Employees/Employees';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/employees/:id" element={<Employees />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
