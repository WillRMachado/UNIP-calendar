import React, { useEffect, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import DayBox from "./components/DayBox";
import remindersService from "../../services/reminders";

export default function DaysListView() {
  const [days, setDays] = useState([]);

  const cbUpdateReminders = (NewDayList) => {
    setDays(NewDayList);
  };
  const fetchReminders = async () => {
    try {
      const response = await remindersService.fetchReminders();
      const result = response.data;

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
          key={day._id}
          sx={{ mb: 10 }}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 12 / (days.length - 2),
            xl: 12 / days.length,
          }}
        >
          <DayBox key={day._id} day={day} cbUpdateReminders={cbUpdateReminders} />
        </Grid>
      ))}
    </Grid>
  );
}
