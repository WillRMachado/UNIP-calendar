import "./App.css";
import { Button, Grid2 as Grid, Paper, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import DaysListView from "./components/DaysListView";

function App() {
  return (
    <div className="App">
      <DaysListView />
      
    </div>
  );
}

export default App;
