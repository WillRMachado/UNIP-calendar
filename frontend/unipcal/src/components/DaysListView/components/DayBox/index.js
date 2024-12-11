import React, { useState } from "react";
import { Box } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import DebounceInput from "../../../DeboucedInput";
import axios from "axios";
import { Item } from "../../../ItemSpot";

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
      <Item
        isHeader
        sx={{ padding: 2, margin: 2 }}
      >{`${day.dayName.toUpperCase()}`}</Item>
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
            <Item isDark sx={{ padding: 2, margin: 2 }}>
              {aiComments}
            </Item>
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
