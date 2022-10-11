import { useState} from "react";
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import MomentUtils from "@date-io/moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function DateTime({ value,val }) {
  const [selectedDate, handleDateChange] = useState();
  var current = new Date();
  var prev = new Date();
  prev.setDate(prev.getDate() - 1);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {value === "add-employee-admin"|| value==="employee-dashboard" ||value==="pagination" ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DesktopDatePicker 
          label="Select Date"
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          maxDate={current}
          fullWidth={true}
          disabled={val==="employee-dashboard"?true:false}
          renderInput={(params) => <TextField {...params} />}
        />
          {/* <DatePicker
            inputVariant="outlined"
            value={selectedDate}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            maxDate={current}
            fullWidth={true}
            disabled={val==="employee-dashboard"?true:false}
          /> */}
        </MuiPickersUtilsProvider>
      ) : (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            inputVariant="outlined"
            value={selectedDate}
            ampm={false}
            onChange={handleDateChange}
            format="DD/MM/YYYY hh:mm a"
            minDate={prev}
            maxDate={current}
            fullWidth={true}
            // style ={{textAlign:'center'}}
          />
        </MuiPickersUtilsProvider>
      )}

      {/* <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd HH:mm"
      /> */}
    </LocalizationProvider>
  );
}

export default DateTime;
