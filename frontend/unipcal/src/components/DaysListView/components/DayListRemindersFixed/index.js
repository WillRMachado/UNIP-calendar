import React from "react";
import { Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import DebounceInput from "../../../DeboucedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function DayListRemindersFixed({
  item,
  cbUpdateReminders,
  index,
  day,
}) {
  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:10000/eventos/${id}/${index}`
      );

      cbUpdateReminders(response.data);
    } catch (error) {
    } finally {
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DebounceInput
        disabled
        debounceTimeout={1000}
        sx={{
          backgroundColor: "#dfdfdf",
          margin: 1,
        }}
        onChange={() => {}}
        handleDebounce={() => {}}
        item={item}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleDelete(day._id, index)}
                  edge="end"
                >
                  <Delete />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
