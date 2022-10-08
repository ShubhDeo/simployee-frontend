import { useState } from "react";
import { useParams } from 'react-router-dom';

function Employees(){
    const { id } = useParams();1
    return(
        <div className="employees">
            <h1>{id}</h1>
        </div>
    );
}

export default Employees;