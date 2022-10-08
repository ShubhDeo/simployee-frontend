import { useState } from "react";
import { useParams } from "react-router-dom";
import PopupForm from "../../Components/PopupForm";

function Employees() {
  const { id } = useParams();
  return (
    <div className="employees">
      <h1>Employee DashBoard</h1>
      <PopupForm />
    </div>
  );
}

export default Employees;
