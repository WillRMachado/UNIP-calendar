import React from "react";
import { TextField } from "@mui/material";
export default function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, ...other } = props;

  const timerRef = React.useRef(undefined);

  const handleChange = (event) => {
    props?.onChange(event);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return (
    <TextField
      size="small"
      {...other}
      multiline
      value={props.item}
      onChange={handleChange}
    />
  );
}
