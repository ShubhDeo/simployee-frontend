import { useState } from "react";
import { useParams } from "react-router-dom";
import PopupForm from "../../Components/PopupForm";

function Employees() {
  const { id } = useParams();
  return (
    <div className="employees">
      <PopupForm />
    </div>
  );
}

export default Employees;
