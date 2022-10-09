import { useState } from "react";
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function DateTime({ joinDate, setJoinDate }) {
  var current = new Date();
  var prev = new Date();

  prev.setDate(prev.getDate() - 1);
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          inputVariant="outlined"
          value={joinDate}
          onChange={(e)=>{setJoinDate(e._d)}}
          format="DD/MM/YYYY"
          maxDate={current}
          fullWidth={true}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DateTime;
