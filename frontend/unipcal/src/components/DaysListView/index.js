import React, { useEffect, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import DayBox from "./components/DayBox";
import axios from "axios";

export default function DaysListView() {
  const [days, setDays] = useState([]);

  const cbUpdateReminders = (NewDayList) => {
    console.log({ NewDayList });
    setDays(NewDayList);
  };
  const fetchReminders = async () => {
    try {
      const resp = await axios.get("http://localhost:10000/list-reminders");
      const result = resp.data;

      console.log({ result });
      cbUpdateReminders(result);
    } catch (error) {}
  };
  useEffect(() => {
    fetchReminders();
  }, []);
  return (
    <Grid container spacing={6}>
      {days?.map((day, index) => (
        <Grid
          sx={{ mb: 10 }}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 12 / (days.length - 2),
            xl: 12 / days.length,
          }}
        >
          <DayBox key={index} day={day} cbUpdateReminders={cbUpdateReminders} />
        </Grid>
      ))}
    </Grid>
  );
}
