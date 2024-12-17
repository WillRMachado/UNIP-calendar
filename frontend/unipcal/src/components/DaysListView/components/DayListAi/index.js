import React, { useState } from "react";
import { Box } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { ItemTextDisplay } from "../../../ItemTextDisplay";
import remindersService from "../../../../services/reminders";
import CircularProgress from "@mui/material/CircularProgress";

export default function DayListAi({ day }) {

  const [aiComments, setAiComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateAiComment = async () => {
    try {
      setIsLoading(true);
      const response = await remindersService.getAiComment(day.reminders);
      setAiComments(response.data.content);
    } catch (error) {
      console.log(`Erro: ${error}`)
    } finally {
      setIsLoading(false);
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
        <>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <SmartToy
              onClick={() => generateAiComment()}
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
          )}
        </>
      ) : (
        <ItemTextDisplay isDark sx={{ padding: 2, margin: 2 }}>
          {aiComments}
        </ItemTextDisplay>
      )}
    </Box>
  );
}
