import React, { useState } from "react";
import { Box } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { ItemTextDisplay } from "../../../ItemTextDisplay";
import axios from "axios";

export default function DayListAi({ day }) {
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
  return (
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
  );
}
