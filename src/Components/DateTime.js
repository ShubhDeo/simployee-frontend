import { useState} from "react";
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function DateTime({ value,val }) {
  const [selectedDate, handleDateChange] = useState();
  var current = new Date();
  var prev = new Date();
  prev.setDate(prev.getDate() - 1);
  return (
    <>
      {value == "add-employee-admin"|| value=="employee-dashboard" ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            inputVariant="outlined"
            value={selectedDate}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            maxDate={current}
            fullWidth={true}
            disabled={val==="employee-dashboard"?true:false}
          />
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
    </>
  );
}

export default DateTime;
