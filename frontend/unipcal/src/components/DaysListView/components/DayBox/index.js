import React from "react";
import {
  Button,
  Grid2 as Grid,
  Paper,
  TextField,
  Box,
  debounce,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, ...other } = props;

  const timerRef = React.useRef(undefined);

  const handleChange = (event) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <TextField {...other} onChange={handleChange} />;
}
export default function index({ day }) {
  const items = [1, 2, 3, 4, 5];

  const handleChange = async (value, field) => {
    console.log({ value, field, day });

    try {
      const a = await axios.post("http://localhost:10000/eventos", {
        value,
        field,
        day,
      });
      console.log({ a });


    } catch (error) {}
  };
  return (
    <>
      <Item sx={{ padding: 2, margin: 2 }}>{`dia: ${day.number}`}</Item>
      {items.map((item, index) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <DebounceInput
            debounceTimeout={1000}
            handleDebounce={(value) => handleChange(value, index)}
          />
        </Box>
      ))}
    </>
  );
}
