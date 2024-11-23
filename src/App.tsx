import { createRef, KeyboardEvent, RefObject, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getLastDigit } from "./axios/useAxios";

function App() {
  const NUM_OF_DIGITS: number = 8;

  const inputs: JSX.Element[] = [];
  const [values, setValues] = useState<string[]>(
    new Array(NUM_OF_DIGITS).fill("")
  );
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>(
    [...Array(NUM_OF_DIGITS)].map(() => createRef())
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

    inputRefs.current[elementIndex + shift]?.current?.focus();
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
        inputRef={inputRefs.current[index]}
        value={values[index]}
      ></TextField>
    );
  }

  const calcLastDigit = async (): Promise<void> => {
    setLastDigit(await getLastDigit(values.join("")));
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
      <Button
        variant="outlined"
        sx={{
          fontSize: "1.5vw",
          borderRadius: "20px",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
        disabled={values.some((value) => value === "")}
        onClick={calcLastDigit}
      >
        Send
      </Button>
      {lastDigit && <Typography>{lastDigit}</Typography>}
    </Box>
  );
}

export default App;
