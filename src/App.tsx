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
    let sum = 0;

    for (let index = 0; index < values.length; index++) {
      const res = (index % 2 === 1 ? 1 : 2) * values[index];
      sum += Math.floor(res / 10 + (res % 10));
    }

    setId((sum % 10).toString());
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
      <Typography sx={{ fontSize: "70px" }}>Enter 8 digits</Typography>
      <Box>{inputs}</Box>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.5vw" }}
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
