import React from "react";
import {
  Button,
  Grid2 as Grid,
  Paper,
  TextField,
  Box,
  debounce,
} from "@mui/material";
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

  return <TextField {...other} value={props.item} onChange={handleChange} />;
}
