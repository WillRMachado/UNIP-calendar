import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ItemTextDisplay = styled(
  Paper, {
    shouldForwardProp: (prop) => prop !== 'isDark' && prop !== 'isHeader', 
  })
  (({ isDark, isHeader, theme }) => ({
  backgroundColor: isDark ? "#aaa" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontWeight: isHeader ? "bold" : "normal",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));