import { useState } from "react";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

function DateTime(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  var current = new Date();
  var prev = new Date();
  prev.setDate(prev.getDate() - 1);
  return (
    <>
      <DateTimePicker
        inputVariant="outlined"
        value={selectedDate}
        ampm={false}
        onChange={handleDateChange}
        format="DD/MM/YYYY HH:mm"
        minDate = {prev}
        maxDate = {current}
        fullWidth={true}
        // style ={{textAlign:'center'}}
      />

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
