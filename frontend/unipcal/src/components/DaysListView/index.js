import React from "react";
import { Button, Grid2 as Grid, Paper, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import DayBox from "./components/DayBox";

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
export default function DaysListView() {
  const days = [{ number: 28 }, { number: 29 }, { number: 30 }, { number: 31 }];
  return (
    <Grid container spacing={6}>
      {days.map((day, index) => (
        <Grid size={12 / days.length}>
          <DayBox key={index} day={day} />
        </Grid>
      ))}
    </Grid>
  );
}
