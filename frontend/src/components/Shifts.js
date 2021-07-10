import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";

const baseURL = process.env.HOST_IP_ADDRESS ? process.env.HOST_IP_ADDRESS : ""

export default function Shifts(props) {

  // TODO: get employeeName from shifts api instead of looking through entire userbase
  // TODO: fix date
  const qs = require('qs');

  const [shiftData, setShiftData] = useState({});
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialNewShiftRow = {
    id: 0,
    employeeName: props.user.name,
    shiftDate: new Date().toLocaleDateString("en-AU"),
    start: "",
    finish: "",
    break: ""
  };
  const [newShiftRow, setNewShiftRow] = useState(initialNewShiftRow);

  useEffect(() => {
    axios.get(baseURL + "/api/v1/organisations/" + props.organisation.id + "/shifts.json")
      .then(response => setShiftData(response.data));
    axios.get(baseURL + "/api/v1/users.json")
      .then(response => setUserData(response.data));
  }, [props.organisation.id]);

  // DataGrid stuff
  const columns = [
    { field: "employeeName", headerName: "Employee name", flex: 1.2, editable: true },
    { field: "shiftDate", headerName: "Shift date", type: "date", flex: 1, editable: true },
    { field: "start", headerName: "Start time", type: "string", flex: 1, editable: true },
    { field: "finish", headerName: "End time", type: "string", flex: 1, editable: true },
    { field: "break", headerName: "Break length (minutes)", type: "string", flex: 1.2, editable: true },
    { field: "hours", headerName: "Hours worked", type: "string", flex: 1, editable: true },
    { field: "cost", headerName: "Shift cost", type: "string", flex: 0.9, editable: true },
  ];

  const generateRows = () =>
    shiftData.data.map((shift, index) => {
      const hours_worked = calculateHoursWorked(
        shift.attributes.start,
        shift.attributes.finish,
        shift.attributes.break_length);

      const cost = calculateCost(
        hours_worked,
        props.organisation.attributes.hourly_rate)

      return {
        id: index + 1,
        employeeName: userData.filter((user) => { return user.id === shift.attributes.user_id })[0].name,
        shiftDate: parseDate(shift.attributes.start),
        start: parseTime(shift.attributes.start),
        finish: parseTime(shift.attributes.finish),
        break: shift.attributes.break_length,
        hours: hours_worked,
        cost: "$" + cost
      }
    });

  const newShiftButton = () =>
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={() => {
          if (isEditing) {
            postShift();
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Save" : "New Shift"}
      </Button>
      {isEditing ?
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "10px 0px " }}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button> : null}
    </React.Fragment>

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, props }) => {
      switch (field) {
        case "employeeName":
          setNewShiftRow({ ...newShiftRow, employeeName: props.value, })
          break;

        case "shiftDate":
          setNewShiftRow({ ...newShiftRow, shiftDate: props.value, })
          break;

        case "start":
          setNewShiftRow({ ...newShiftRow, start: props.value, })
          break;

        case "finish":
          setNewShiftRow({ ...newShiftRow, finish: props.value, })
          break;

        case "break":
          setNewShiftRow({ ...newShiftRow, break: props.value, })
          break;

        default:
          return;
      }
    }, [newShiftRow],
  );

  function postShift() {
    axios.post("/api/v1/shifts", qs.stringify(
      {
        shift: {
          start: string2ISODateString(newShiftRow.shiftDate, newShiftRow.start),
          finish: string2ISODateString(newShiftRow.shiftDate, newShiftRow.finish),
          break_length: parseInt(newShiftRow.break),
          organisation_id: parseInt(props.organisation.id),
          user_id: props.user.id
        }
      }), { withCredentials: true })
      .then(response => {
        setShiftData({
          "data": [
            ...shiftData.data,
            response.data.data
          ]
        });
        setNewShiftRow(initialNewShiftRow);
      })
  };

  // Helper functions /////////////////////////////////////////////////////////
  function string2ISODateString(dateString, timeString) {
    const splitDate = dateString.split("/");
    const splitTime = timeString.split(":");

    const dateObject = new Date(
      splitDate[2], splitDate[1],
      splitDate[0], parseInt(splitTime[0]), parseInt(splitTime[1]));

    return dateObject.toISOString();
  };

  function parseDate(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-AU");
  };

  function parseTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toString().split(" ")[4].slice(0, 5)
  };

  function calculateHoursWorked(start, end, break_length) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (((endDate - startDate) / 1000 / 60 / 60) - (break_length / 60)).toFixed(2);
  };

  function calculateCost(hours_worked, rate) {
    return (hours_worked * rate).toFixed(2);
  };
  /////////////////////////////////////////////////////////////////////////////

  return (
    <div style={{ height: 200, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {userData && shiftData.data ?
            <DataGrid
              rows={isEditing ? [...generateRows(), newShiftRow] : generateRows()}
              columns={columns}
              autoHeight
              isCellEditable={(params) => params.row.id === 0}
              onEditCellChangeCommitted={handleEditCellChangeCommitted}
              components={{
                Footer: newShiftButton,
              }}
            /> : null}
        </div>
      </div>
    </div>
  )
}