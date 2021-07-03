import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';

export default function Shifts(props) {

  const [shiftData, setShiftData] = useState({});

  useEffect(() => {
    axios.get("/api/v1/organisations/" + props.organisation.id + "/shifts.json")
      .then(response => setShiftData(response.data))
  }, [props.organisation.id]);

  // DataGrid stuff
  const columns = [
    { field: "employeeName", headerName: "Employee name", flex: 1.2, editable: false },
    { field: "shiftDate", headerName: "Shift date", type: "date", flex: 1, editable: false },
    { field: "start", headerName: "Start time", type: "string", flex: 1, editable: false },
    { field: "finish", headerName: "End time", type: "string", flex: 1, editable: false },
    { field: "break", headerName: "Break length (minutes)", type: "string", flex: 1.2, editable: false },
    { field: "hours", headerName: "Hours worked", type: "string", flex: 1, editable: false },
    { field: "cost", headerName: "Shift cost", type: "string", flex: 0.9, editable: false },
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
        id: index,
        employeeName: shift.attributes.user_id,
        shiftDate: parseDate(shift.attributes.start),
        start: parseTime(shift.attributes.start),
        finish: parseTime(shift.attributes.finish),
        break: shift.attributes.break_length,
        hours: hours_worked,
        cost: cost
      }
    });

  function parseDate(dateTimeString) {
    return new Date(dateTimeString);
  };

  function parseTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toString().split(" ")[4].slice(0, 5)
  };

  function calculateHoursWorked(start, end, break_length) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return ((endDate - startDate) / 1000 / 60 / 60) - (break_length / 60);
  };

  function calculateCost(hours_worked, rate) {
    return hours_worked * rate;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {shiftData.data ? <DataGrid rows={generateRows()} columns={columns} /> : null}
        </div>
      </div>
    </div>
  )
}