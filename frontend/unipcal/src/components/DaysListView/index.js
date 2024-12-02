import React, { useEffect, useState } from "react";
import { Button, Grid2 as Grid, Paper, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import DayBox from "./components/DayBox";
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
export default function DaysListView() {
  const [days, setDays] = useState([]);

  const updateDayList = (NewDayList) => {
    setDays(NewDayList);
  };
  const fetchReminders = async () => {
    try {
      const resp = await axios.get("http://localhost:10000/eventos");
      updateDayList(resp.data);
      console.log({ resp });
    } catch (error) {}
  };
  useEffect(() => {
    fetchReminders();
  }, []);
  return (
    <Grid container spacing={6}>
      {days?.map((day, index) => (
        <Grid size={12 / days.length}>
          <DayBox key={index} day={day} updateDayList={updateDayList} />
        </Grid>
      ))}
    </Grid>
  );
}
