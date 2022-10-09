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

function Employees() {
  const colors=["hsl(227, 70%, 50%)","hsl(130, 88%, 51%)","hsl(4, 94%, 49%)"];
  const numberMapName=["break","meeting","work"]
  const data = [
    {
      id: "break", //1
      label: "break",
      value: 250,
      color: "hsl(227, 70%, 50%)",
    },
    {
      id: "meeting", //2
      label: "meeting",
      value: 412,
      color: "hsl(130, 88%, 51%)",
    },
    {
      id: "work", //3
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
  const [employeeInfoToday, setEmployeeInfoToday] = useState(null);
  const [employeeInfoPrevious,setEmployeeInfoPrevious]=useState(null);
  const navigate = useNavigate();

  useEffect(()=> {
    if(localStorage.getItem("token")===null) {
        navigate("/")
    }

    const fetchEmployeeToday = async () => {
      let dateString="";
      let currentDate=new Date();
      let year=currentDate.getFullYear();
      let month=currentDate.getMonth()+1;
      let date=currentDate.getDate();
      dateString=`${year}-${month}-${date}`
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/task/fetch/${id}/${dateString}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      let taskCategory=new Map();
      data.map((task)=>{
        if(taskCategory.get(task.taskType)){
          let temp=taskCategory.get(task.taskType);
          temp=temp+1;
          taskCategory.set(task.taskType,temp)
        }
        else taskCategory.set(task.taskType,1);
      })
      let finalTaskArray=[];
      for(let [key,value] of taskCategory){
        finalTaskArray.push({
          id:numberMapName[key-1],
          label:numberMapName[key-1],
          value:value,
          color:colors[id-1]
        })
        setEmployeeInfoToday(finalTaskArray)
      } 
    }
    const fetchEmployeePrevious = async () => {
      let dateString="";
      let currentDate=new Date();
      currentDate.setDate(currentDate.getDate()-1);
      let year=currentDate.getFullYear();
      let month=currentDate.getMonth()+1;
      let date=currentDate.getDate();
      dateString=`${year}-${month}-${date}`
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE}/api/task/fetch/${id}/${dateString}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = response.data;
      let taskCategory=new Map();
      data.map((task)=>{
        if(taskCategory.get(task.taskType)){
          let temp=taskCategory.get(task.taskType);
          temp=temp+1;
          taskCategory.set(task.taskType,temp)
        }
        else taskCategory.set(task.taskType,1);
      })
      let finalTaskArray=[];
      for(let [key,value] of taskCategory){
        finalTaskArray.push({
          id:numberMapName[key-1],
          label:numberMapName[key-1],
          value:value,
          color:colors[id-1]
        })
        setEmployeeInfoPrevious(finalTaskArray)
      } 
    }
    fetchEmployeeToday();
    fetchEmployeePrevious()

  }, [])

  return (
    <div style={{ height: "100vh" }} className="employees" id="employee-bg">
      <EmployeeNav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <DateTime value={"employee-dashboard"} />
        </div>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Pie Chart */}
        {/* <div style={{ display: "flex" }}> */}
        {employeeInfoToday&&
        <div style={{ height: "40vh", width: "30%",textAlign:"center" }}>
          <h2>Your Statistics for Today</h2>
          <Piechart data={employeeInfoToday} />
        </div>
      }
      
      {employeeInfoPrevious&&
        <div style={{ height: "40vh", width: "30%",textAlign:"center" }}>
          <h2>Your Statistics for Today</h2>
          <Piechart data={employeeInfoPrevious} />
        </div>}
      </div>
      {/* Bar Chart */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "35vh",
            width: "40%",
          }}
        >
          <Barchart data={data2} />
        </div>
      </div>
    </div>
  );
}

export default Employees;
