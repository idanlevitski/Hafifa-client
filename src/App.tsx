import { KeyboardEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getLastDigit } from "./axios/useAxios";

function App() {
  const NUM_OF_DIGITS: number = 8;

  const [values, setValues] = useState<string[]>(
    new Array(NUM_OF_DIGITS).fill("")
  );
  const [lastDigit, setLastDigit] = useState<number | undefined>(undefined);

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    const elementIndex = parseInt((e.target as HTMLInputElement).id);

    const newValues: string[] = [...values];

    if (/^\d$/.test(e.key)) {
      newValues[elementIndex] = e.key;
      setValues(newValues);

      document.getElementById(`${elementIndex + 1}`)?.focus();
    } else if (e.key === "Backspace") {
      newValues[elementIndex] = "";
      setValues(newValues);

      document.getElementById(`${elementIndex - 1}`)?.focus();
    }
  };

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
      <Box>
        {new Array(NUM_OF_DIGITS).fill(undefined).map((_, index) => {
          return (
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
        })}
      </Box>
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

      <Typography>{lastDigit}</Typography>
    </Box>
  );
}

export default App;
