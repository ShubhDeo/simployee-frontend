import { useState } from "react";
import { useParams } from "react-router-dom";
import PopupForm from "../../Components/PopupForm";
import Piechart from "../../Components/Piechart";
import DateTime from "../../Components/DateTime";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Barchart } from "../../Components/Barchart";

function Employees() {
  const data = [
    {
      id: "break",
      label: "break",
      value: 250,
      color: "hsl(227, 70%, 50%)",
    },
    {
      id: "meeting",
      label: "meeting",
      value: 412,
      color: "hsl(130, 88%, 51%)",
    },
    {
      id: "work",
      label: "work",
      value: 353,
      color: "hsl(4, 94%, 49%)",
    },
  ];

  const data2 = [
    {
      "Task Type": "Not Working",
      "Total Minutes": 183,
      "Total MinutesColor": "hsl(294, 70%, 50%)",
    },
    {
      "Task Type": "Working",
      "Total Minutes": 179,
      "Total MinutesColor": "hsl(64, 70%, 50%)",
    },
    {
      "Task Type": "Meetings",
      "Total Minutes": 145,
      "Total MinutesColor": "hsl(222, 70%, 50%)",
    },
  ];
  const { id } = useParams();
  const [info, setInfo] = useState();
  return (
    <div className="employees">
      <h1>Employee DashBoard</h1>
      <div style={{ display: "flex", width: "20%" }}>
        {/* Pop-up form */}
        <PopupForm />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTime />
        </MuiPickersUtilsProvider>
      </div>

      {/* Pie Chart */}
      <div style={{ display: "flex" }}>
        <div style={{ height: "40vh", width: "50%" }}>
          <Piechart data={data} />
        </div>
        <div style={{ height: "40vh", width: "50%" }}>
          <Piechart data={data} />
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{ height: "40vh", width: "50%" }}>
        <Barchart data={data2} />
      </div>
    </div>
  );
}

export default Employees;
