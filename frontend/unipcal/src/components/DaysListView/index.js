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

      cbUpdateReminders(result);
    } catch (error) {}
  };
  useEffect(() => {
    fetchReminders();
  }, []);
  return (
    <Grid container spacing={6}>
      {days?.map((day, index) => (
        <Grid size={12 / days.length}>
          <DayBox key={index} day={day} cbUpdateReminders={cbUpdateReminders} />
        </Grid>
      ))}
    </Grid>
  );
}
