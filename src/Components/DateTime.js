import { useState,Fragment } from "react";
import { DateTimePicker, KeyboardDateTimePicker,DatePicker } from "@material-ui/pickers";

function DateTime({ values }) {
  const [selectedDate, handleDateChange] = useState();
  var current = new Date();
  var prev = new Date();
  prev.setDate(prev.getDate() - 1);
  return (
    <>{
      values==="ad"?(<Fragment>
        <DatePicker
      inputVariant="outlined"
      value={selectedDate}
      onChange={handleDateChange}
      format="DD/MM/YYYY"
      maxDate={current}
      fullWidth={true}
    />
      </Fragment>):(<DateTimePicker
    inputVariant="outlined"
    value={selectedDate}
    ampm={false}
    onChange={handleDateChange}
    format="DD/MM/YYYY"
    minDate={values !== "ads" ? prev : 0}
    maxDate={values !== "ads" ? current : Date("2100-01-01")}
    fullWidth={true}
    // style ={{textAlign:'center'}}
  />)
    }
    
      

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
