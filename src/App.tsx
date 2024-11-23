import { createRef, KeyboardEvent, useRef, useState } from "react";
import "./App.css";
import { Box, Button, TextField, Typography } from "@mui/material";

function App() {
  const NUM_OF_DIGITS: number = 8;

  const inputs: JSX.Element[] = [];
  const [values, setValues] = useState<string[]>(new Array(8).fill(""));
  const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>(
    [...Array(NUM_OF_DIGITS)].map(() => createRef())
  );

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    let diff: number = 0;
    const element: HTMLInputElement = e.target as HTMLInputElement;
    const newValues: string[] = [...values];
    if (/^\d$/.test(e.key)) {
      diff = 1;

      newValues[parseInt(element.id)] = e.key;
      setValues(newValues);
    } else if (e.key === "Backspace") {
      diff = -1;

      newValues[parseInt(element.id)] = "";
      setValues(newValues);
    } else {
      e.preventDefault();
    }

    const currentIndex: number = inputRefs.current.findIndex(
      (inputRef) => inputRef.current === element
    );

    inputRefs.current[currentIndex + diff]?.current?.focus();
  };

  const handleClick = () => {
    console.log(`TODO - ${values}`);
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
        disabled={values.some((value) => value === "")}
        onClick={handleClick}
      >
        Send
      </Button>
    </Box>
  );
}

export default App;
