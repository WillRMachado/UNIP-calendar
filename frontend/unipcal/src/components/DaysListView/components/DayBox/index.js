import React, { useState } from "react";
import {
  Button,
  Grid2 as Grid,
  Paper,
  TextField,
  Box,
  debounce,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, SmartToy } from "@mui/icons-material";
import DebounceInput from "../../../DaboucedInput";
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
const ItemAI = styled(Paper)(({ theme }) => ({
  backgroundColor: "#aaa",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function DayBox({ day, cbUpdateReminders }) {
  const [editValue, setEditValue] = useState("");
  const [aiComments, setAiComments] = useState("");

  console.log({ day });

  const generateAiComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:10000/get-ai-comment",
        {
          reminders: day.reminders,
        }
      );
      console.log({ response });
      setAiComments(response.data.content);
    } catch (error) {
    } finally {
    }
  };
  const handleChange = async (value, field) => {
    console.log({ value, field, day });

    try {
      const a = await axios.post("http://localhost:10000/eventos", {
        value,
        field,
        day,
      });

      cbUpdateReminders(a.data);
      console.log({ a });
    } catch (error) {
    } finally {
      setEditValue("");
    }
  };
  return (
    <>
      <Item sx={{ padding: 2, margin: 2 }}>{`${day.dayName}`}</Item>
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
            <ItemAI sx={{ padding: 2, margin: 2 }}>{aiComments}</ItemAI>
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
          {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
          <DebounceInput
            debounceTimeout={1000}
            sx={{
              backgroundColor: "#aaa",
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
        {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
        <DebounceInput
          debounceTimeout={1000}
          handleDebounce={(value) => handleChange(value, DayBox)}
          item={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      </Box>
    </>
  );
}
