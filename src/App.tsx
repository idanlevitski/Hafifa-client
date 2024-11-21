import { FormEvent, ReactElement, ReactNode, useState } from "react";
import "./App.css";
import { Box, Button, TextField, Typography } from "@mui/material";

function App() {
  const inputs: JSX.Element[] = [];
  const NUM_OF_DIGITS: number = 8;
  const values: number[] = new Array(8).fill(-1);
  const [isFull, setIsFull] = useState(false);

  const validateInput = (e: FormEvent<HTMLInputElement>) => {
    if (!parseInt((e.target as HTMLInputElement).value)) {
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    validateInput(e);
    const element = e.target as HTMLInputElement;
    values[parseInt(element.name)] = parseInt(element.value);
    setIsFull(values.every((value) => value !== -1));
  };

  for (let index = 0; index < NUM_OF_DIGITS; index++) {
    inputs.push(
      <TextField
        sx={{
          height: "5vh",
          width: "5vh",
          mr: "1vw",
          textAlign: "center",
          fontSize: "10vw",
        }}
        className="input"
        onInput={handleInput} /*maxLength={1}*/
        name={`${index}`}
      ></TextField>
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
      <Button variant="outlined" sx={{ fontSize: "1.5vw" }} disabled={!isFull}>
        Send
      </Button>
    </Box>
  );
}

export default App;
