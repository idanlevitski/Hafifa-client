import { useState } from "react";
import "./App.css";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const inputs = [];
  const NUM_OF_DIGITS: number = 8;
  const [id, setId] = useState("");

  const updateId = () => {
    setId("");
    // inputs.forEach((input) => {
    //   input;
    // });
  };

  for (let index = 0; index < NUM_OF_DIGITS; index++) {
    inputs.push(
      <input className="input" onInput={updateId} maxLength={1}></input>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "25vh",
        gap: "3vh",
      }}
    >
      <Typography sx={{ fontSize: "70px" }}>Enter 8 digits</Typography>
      <Box>{inputs}</Box>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.5vw" }}
        disabled={id.length !== NUM_OF_DIGITS}
      >
        Send
      </Button>
    </Box>
  );
}

export default App;
