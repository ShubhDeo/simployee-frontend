import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import Piechart from "./Piechart";
import { Barchart } from "./Barchart";
import DateTimeAdmin from "./DateTimeAdmin";
import axios from "axios";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

const columns = [
  {
    dataField: "username",
    text: "Employee Name",
    sort: true,
    // headerStyle: {
    //   border: "1px solid black"
    // }
  },
  {
    dataField: "email",
    text: "Email Id",
    // headerStyle: {
    //   border: "1px solid black"
    // }
  },
  {
    dataField: "contact",
    text: "Contact",
    // headerStyle: {
    //   border: "1px solid black"
    // }
  },
];

export default function App({
  employees,
  setEmployees,
  selected,
  setSelected,
  nonSelected,
  setNonSelected,
}) {
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

  const [modalInfo, setModalInfo] = useState([]);
  // const [selected, setSelected] = useState(null);
  // const [nonSelected, setNonSelected] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setModalInfo(row);
      setShow(true);
    },
  };

  const handleSelect = async (e) => {
    console.log(e);
    await axios.put(
      `${process.env.REACT_APP_BACKEND_BASE}/api/user/deactivate/${e._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // let data = response.data;
    let selectedArray = selected.slice(0);
    let nonSelectedArray = nonSelected.slice(0);
    let employeesArray = employees.slice(0);

    let selectedArrayTemp = [];
    selectedArray.map((selected, index) => {
      if (index === e.id) selectedArrayTemp.push(index);
      return null;
    });

    employeesArray.map((employee) => {
      if (employee.id === e.id) employee.isActivated = false;
      return null;
    });

    console.log(employeesArray);
    nonSelectedArray.push(e.id);
    setNonSelected(nonSelectedArray);
    setSelected(selectedArrayTemp);
    setEmployees(employeesArray);
  };

  useEffect(() => {
    if (employees) {
      let selectedArray = [];
      let nonSelectedArray = [];
      employees.map((employee, index) => {
        // console.log(localStorage.getItem("id"), employee._id);
        if (employee.isActivated && localStorage.getItem("id") !== employee._id)
          selectedArray.push(index);
        else nonSelectedArray.push(index);
        return null;
      });
      setSelected(selectedArray);
      setNonSelected(nonSelectedArray);
    }
  }, [employees]);

  const ModalContent = ({ id, name }) => {
    const numberMapName = ["break", "meeting", "work"];
    const [employeeInfoToday, setEmployeeInfoToday] = useState(null);
    const [employeeInfoPrevious, setEmployeeInfoPrevious] = useState(null);
    const [employeeInfoWeek, setEmployeeInfoWeek] = useState(null);
    useEffect(() => {
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
            // color: colors[id - 1],
          });
          setEmployeeInfoToday(finalTaskArray);
        }
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
            "Task Type": "Working",
            "Total Minutes": 0,
          },
          {
            "Task Type": "Meetings",
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
            // color: colors[id - 1],
          });
          setEmployeeInfoPrevious(finalTaskArray);
        }
      };
      fetchEmployeePrevious();
      fetchEmployeeToday();
      fetchEmployeeWeeklyTask();
    }, []);
    return (
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily: "Poppins", fontWeight: "bolder"}}>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            {employeeInfoToday ? (
              <div style={{ height: "40vh", width: "50%" }}>
                <h4>{name}'s Statistics for today</h4>
                <Piechart data={employeeInfoToday} />
              </div>
            ) : (
              <div style={{ width: "50%" }}>
                <h4>No Data available for today</h4>
              </div>
            )}
            {employeeInfoPrevious ? (
              <div style={{ height: "40vh", width: "50%" }}>
                <h4>{name}'s Statistics for yesterday</h4>
                <Piechart data={employeeInfoPrevious} />
              </div>
            ) : (
              <div style={{ width: "50%" }}>
                <h4>No Data available for yesterday</h4>
              </div>
            )}
          </div>
          {/* Bar Chart */}
          {employeeInfoWeek ? (
            <div style={{ height: "40vh", width: "100%", marginTop: "100px" }}>
              <h4>{name}'s Statistics for last week</h4>
              <Barchart data={employeeInfoWeek} />
            </div>
          ) : (
            <div style={{ marginTop: "25%" }}>
              <h4>Weekly data is unavailable</h4>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ marginTop: "100px" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const rowStyle = {
    border: "1px solid black",
  };

  return (
    <div style={{ marginRight: "2%", marginLeft: "2%" }}>
      {employees && selected && nonSelected && (
        <BootstrapTable
          bordered
          bootstrap4
          keyField="id"
          data={employees}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
          rowEvents={rowEvents}
          selectRow={{
            selectColumnPosition: "right",
            selected: selected,
            nonSelectable: nonSelected,
            mode: "checkbox",
            onSelect: handleSelect,
            //style: {border: "1px solid black"}
          }}
          // rowStyle={rowStyle}
        />
      )}
      {employees && show && selected && modalInfo ? (
        <ModalContent id={modalInfo._id} name={modalInfo.username} />
      ) : null}
    </div>
  );
}
