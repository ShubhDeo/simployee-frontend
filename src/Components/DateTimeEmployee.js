import { useState } from "react";
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function DateTime({ joinDate, setJoinDate }) {
  var current = new Date();
  var prev = new Date();

  prev.setDate(prev.getDate() - 1);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DesktopDatePicker
            label="Select Date"
            inputFormat="MM/DD/YYYY"
            value={joinDate}
            onChange={setJoinDate}
            maxDate={current}
            fullWidth={true}
            renderInput={(params) => <TextField {...params} />}
          />
        </MuiPickersUtilsProvider>
      </LocalizationProvider>
    </>
  );
}

export default DateTime;
