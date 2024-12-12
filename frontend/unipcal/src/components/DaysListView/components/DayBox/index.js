import React, { useState } from "react";
import { Box } from "@mui/material";
import { SmartToy, Delete } from "@mui/icons-material";
import DebounceInput from "../../../DeboucedInput";
import axios from "axios";
import { ItemTextDisplay } from "../../../ItemTextDisplay";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function DayBox({ day, cbUpdateReminders }) {
  const [editValue, setEditValue] = useState("");
  const [aiComments, setAiComments] = useState("");

  const generateAiComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:10000/get-ai-comment",
        {
          reminders: day.reminders,
        }
      );
      setAiComments(response.data.content);
    } catch (error) {
    } finally {
    }
  };
  const handleChange = async (value, field) => {
    try {
      const response = await axios.post("http://localhost:10000/eventos", {
        value,
        field,
        day,
      });

      cbUpdateReminders(response.data);
    } catch (error) {
    } finally {
      setEditValue("");
    }
  };
  const handleDelete = async (id, index) => {
    try {
      console.log({ id, index });
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
        border: 1,
        borderRadius: 1,
        padding: 1,
        margin: 1,
        borderColor: "#eee",
      }}
    >
      <ItemTextDisplay
        isHeader
        sx={{ padding: 2, margin: 2 }}
      >{`${day.dayName.toUpperCase()}`}</ItemTextDisplay>
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!aiComments ? (
            <SmartToy
              onClick={() => generateAiComment()}
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
          ) : (
            <ItemTextDisplay isDark sx={{ padding: 2, margin: 2 }}>
              {aiComments}
            </ItemTextDisplay>
          )}
        </Box>
      </>
      {day.reminders.map((item, index) => (
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
