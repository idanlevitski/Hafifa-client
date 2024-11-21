import { FormEvent, useState } from "react";
import "./App.css";
import { Box, Button, TextField, Typography } from "@mui/material";

function App() {
  const NUM_OF_DIGITS: number = 8;

  const inputs: JSX.Element[] = [];
  const [values, setValues] = useState<number[]>(new Array(8).fill(-1));
  const [isFull, setIsFull] = useState(false);
  const [id, setId] = useState("");

  const validateInput = (e: FormEvent<HTMLInputElement>) => {
    console.log((e.target as HTMLInputElement).value);
    if (!parseInt((e.target as HTMLInputElement).value)) {
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    validateInput(e);
    const element = e.target as HTMLInputElement;
    values[parseInt(element.id)] = parseInt(element.value);

    setIsFull(!values.some((value) => isNaN(value) || value === -1));
  };

  const handleClick = () => {
    setId("TODO");
  };

  for (let index = 0; index < NUM_OF_DIGITS; index++) {
    inputs.push(
      <TextField
        sx={{
          width: "5vh",
          mr: "1vw",
          borderColor: "#0066ff",
        }}
        onInput={handleInput}
        id={`${index}`}
        slotProps={{ htmlInput: { maxLength: 1 } }}
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
      <Typography
        sx={{
          fontSize: "70px",
          cursor: "default",
          fontFamily: "cursive",
          color: "#0066ff",
        }}
      >
        Enter 8 digits
      </Typography>
      <Box>{inputs}</Box>
      <Button
        variant="outlined"
        sx={{
          fontSize: "1.5vw",
          borderRadius: "20px",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
        disabled={!isFull}
        onClick={handleClick}
      >
        Send
      </Button>
      <Typography>{id}</Typography>
    </Box>
  );
}

export default App;
