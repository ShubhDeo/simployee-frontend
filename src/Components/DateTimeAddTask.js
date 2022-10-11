// import { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function DateTimeAddTask({ startTime,setStartTime }) {
  var current = new Date();
  var prev = new Date();
  prev.setDate(prev.getDate() - 1);
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        inputVariant="outlined"
        value={startTime}
        ampm={false}
        onChange={(e)=>{setStartTime(e._d)}}
        format="DD/MM/YYYY hh:mm a"
        minDate={prev}
        maxDate={current}
        fullWidth={true}
        // style ={{textAlign:'center'}}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimeAddTask;
