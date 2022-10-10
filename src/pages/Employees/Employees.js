import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PopupForm from "../../Components/PopupForm";
import Piechart from "../../Components/Piechart";
import DateTime from "../../Components/DateTime";
import { Barchart } from "../../Components/Barchart";
import AddEmployee from "../../Components/AddEmployee";
import EmployeeNav from "../../Components/EmployeeNav";
import EditEmployeeDetails from "../../Components/EditEmployeeDetails";
import axios from "axios";
// import { TempleBuddhistOutlined } from "@mui/icons-material";
import { parseNonNullablePickerDate } from "@mui/x-date-pickers/internals";
import {Row, Col} from 'react-bootstrap'
import './Employee.css'

function Employees() {
  const colors = [
    "hsl(227, 70%, 50%)",
    "hsl(130, 88%, 51%)",
    "hsl(4, 94%, 49%)",
  ];
  const numberMapName = ["break", "meeting", "work"];
  const { id } = useParams();
  const [employeeInfoToday, setEmployeeInfoToday] = useState(null);
  const [employeeInfoPrevious, setEmployeeInfoPrevious] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [employeeInfoWeek, setEmployeeInfoWeek] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }

    const fetchEmployeeDetails = async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      // console.log(data);
      setEmployeeName(data.username);
      setEmployeeDetails(data);
    };

    const fetchEmployeeWeeklyTask = async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/task/fetch/week/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let resData = response.data; //[]
      let weeklyArray = [
        {
          "Task Type": "Not Working",
          "Total Minutes": 0,
        },
        {
          "Task Type": "Meetings",
          "Total Minutes": 0,
        },
        {
          "Task Type": "Work",
          "Total Minutes": 0,
        },
      ];
      let weeklyTime = [0, 0, 0];
      resData.forEach((tasks) => {
        // console.log(tasks.taskType)
        let num = parseInt(tasks.taskType - 1);
        let time = parseInt(tasks.timeTaken);
        // console.log(time)
        weeklyTime[num] += time;
        // console.log(weeklyTime[num])
      });
      weeklyArray[0]["Total Minutes"] = weeklyTime[0];
      weeklyArray[1]["Total Minutes"] = weeklyTime[1];
      weeklyArray[2]["Total Minutes"] = weeklyTime[2];
      setEmployeeInfoWeek(weeklyArray);
    };

    const fetchEmployeeToday = async () => {
      let dateString = "";
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let date = currentDate.getDate();
      dateString = `${year}-${month}-${date}`;
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/task/fetch/${id}/${dateString}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      let taskCategory = new Map();
      data.map((task) => {
        if (taskCategory.get(task.taskType)) {
          let temp = taskCategory.get(task.taskType);
          temp = temp + 1;
          taskCategory.set(task.taskType, temp);
        } else taskCategory.set(task.taskType, 1);
      });
      let finalTaskArray = [];
      for (let [key, value] of taskCategory) {
        finalTaskArray.push({
          id: numberMapName[key - 1],
          label: numberMapName[key - 1],
          value: value,
          color: colors[id - 1],
        });
        setEmployeeInfoToday(finalTaskArray);
      }
    };
    const fetchEmployeePrevious = async () => {
      let dateString = "";
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let date = currentDate.getDate();
      if (date <= 9) {
        date = `0${date}`;
      }
      dateString = `${year}-${month}-${date}`;
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/task/fetch/${id}/${dateString}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      let taskCategory = new Map();
      data.map((task) => {
        if (taskCategory.get(task.taskType)) {
          let temp = taskCategory.get(task.taskType);
          temp = temp + 1;
          taskCategory.set(task.taskType, temp);
        } else taskCategory.set(task.taskType, 1);
      });
      let finalTaskArray = [];
      for (let [key, value] of taskCategory) {
        finalTaskArray.push({
          id: numberMapName[key - 1],
          label: numberMapName[key - 1],
          value: value,
          color: colors[id - 1],
        });
        setEmployeeInfoPrevious(finalTaskArray);
      }
    };

    fetchEmployeeDetails();
    fetchEmployeeToday();
    fetchEmployeePrevious();
    fetchEmployeeWeeklyTask();

    // console.log("weekly")
    //console.log(employeeInfoWeek)
  }, []);

  return (
    <div style={{ minHeight: "100vh", overflowX: "clip" }} className="employees" id="employee-bg">
      <EmployeeNav
        id={id}
        employeeName={employeeName}
        setEmployeeName={setEmployeeName}
        employeeDetails={employeeDetails}
        setEmployeeDetails={setEmployeeDetails}
        employeeInfoToday={employeeInfoToday}
        setEmployeeInfoToday={setEmployeeInfoToday}
        employeeInfoPrevious={employeeInfoPrevious}
        setEmployeeInfoPrevious={setEmployeeInfoPrevious}
        employeeInfoWeek={employeeInfoWeek}
        setEmployeeInfoWeek={setEmployeeInfoWeek}
      />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <DateTime value={"employee-dashboard"} />
        </div> 
      </div> */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Pie Chart */}
        {/* <div style={{ display: "flex" }}> */}
        <Row>
        {employeeInfoToday && (
          <Col xs={12} lg={6} className="mb-5">
            <div style={{ height: "40vh", width: "100%", textAlign: "center" }}>
            <h4>Your Statistics for Today</h4>
            <Piechart data={employeeInfoToday} />
          </div>
          </Col>
        )}

        {employeeInfoPrevious && (
          <Col xs={12} lg={6} className="mb-5">
            <div style={{ height: "40vh", width: "100%", textAlign: "center" }}>
            <h4>Your Statistics for Yesterday</h4>
            <Piechart data={employeeInfoPrevious} />
          </div>
          </Col>
        )}
        </Row>
      </div>
      {/* Bar Chart */}
      <Row>
      {employeeInfoWeek&&
        <Col xs={12} sm={12} lg={6} className="mx-auto mt-3 mb-3">
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "45vh",
            width: "100%",
            margin: "0px auto 0 auto"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "45vh",
              width: "100%",
              margin: "0px auto 0 auto",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Weekly Statistics for Tasks</h4>
            <Barchart data={employeeInfoWeek} />
          </div>
        </div>
      </div>
        </Col>
      }
     </Row>
    </div>
  );
}

export default Employees;
