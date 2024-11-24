import { KeyboardEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getLastDigit } from "./axios/useAxios";

function App() {
  const NUM_OF_DIGITS: number = 8;

  const inputs: JSX.Element[] = [];
  const [values, setValues] = useState<string[]>(
    new Array(NUM_OF_DIGITS).fill("")
  );
  const [lastDigit, setLastDigit] = useState<number | undefined>(undefined);

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    let shift: number = 0;
    const elementIndex = parseInt((e.target as HTMLInputElement).id);

    const newValues: string[] = [...values];

    if (/^\d$/.test(e.key)) {
      shift = 1;

      newValues[elementIndex] = e.key;
      setValues(newValues);
    } else if (e.key === "Backspace") {
      shift = -1;

      newValues[elementIndex] = "";
      setValues(newValues);
    } else {
      e.preventDefault();
    }

    document.getElementById(`${elementIndex + shift}`)?.focus();
  };

  for (let index = 0; index < NUM_OF_DIGITS; index++) {
    inputs.push(
      <TextField
        sx={{
          width: "5vh",
          mr: "1vw",
          borderColor: "#0066ff",
        }}
        onKeyDown={handleInput}
        id={`${index}`}
        key={index}
        slotProps={{ htmlInput: { maxLength: 1 } }}
        value={values[index]}
        className="inputBox"
      ></TextField>
    );
  }

  const handleClear = () => {
    setValues(new Array(NUM_OF_DIGITS).fill(""));
    setLastDigit(undefined);
  };

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
        {`Enter ${NUM_OF_DIGITS} digits`}
      </Typography>
      <Box>{inputs}</Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1vw" }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: "1.5vw",
            borderRadius: "20px",
            fontWeight: "bold",
            fontFamily: "cursive",
          }}
          disabled={values.some((value) => value === "")}
          onClick={async () =>
            setLastDigit(await getLastDigit(values.join("")))
          }
        >
          Calculate
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "1.5vw",
            borderRadius: "20px",
            fontWeight: "bold",
            fontFamily: "cursive",
            color: "red",
            borderColor: "red",
          }}
          disabled={values.every((value) => value === "")}
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>

      {lastDigit && <Typography>{lastDigit}</Typography>}
    </Box>
  );
}

export default App;
