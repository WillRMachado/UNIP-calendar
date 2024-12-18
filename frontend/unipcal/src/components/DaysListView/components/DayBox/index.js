import React, { useState } from "react";
import { Box } from "@mui/material";
import DebounceInput from "../../../DeboucedInput";
import { ItemTextDisplay } from "../../../ItemTextDisplay";
import DayListAi from "../DayListAi";
import DayListRemindersFixed from "../DayListRemindersFixed";
import remindersService from "../../../../services/reminders";

export default function DayBox({ day, cbUpdateReminders }) {
  const [editValue, setEditValue] = useState("");

  const handleChange = async (value, field) => {
    try {
      const response = await remindersService.addReminder(value, field, day);

      cbUpdateReminders(response.data);
    } catch (error) {
    } finally {
      setEditValue("");
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 1,
        padding: 1,
        margin: 1,
        borderColor: "#eee",
      }}
    >
      <ItemTextDisplay isHeader sx={{ padding: 2, margin: 2 }}>
        {`${day.dayName.toUpperCase()}`}
      </ItemTextDisplay>

      <DayListAi day={day} key={day._id}/>

      {day.reminders.map((item, index) => (
        <DayListRemindersFixed
          item={item}
          cbUpdateReminders={cbUpdateReminders}
          index={index}
          day={day}
        />
      ))}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DebounceInput
          debounceTimeout={1000}
          handleDebounce={(value) => handleChange(value, DayBox)}
          item={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      </Box>
    </Box>
  );
}
