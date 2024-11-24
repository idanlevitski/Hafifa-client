import { ClipboardEvent, KeyboardEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getLastDigit } from "./axios/useAxios";
import { handleClear, handleInput, handlePaste } from "./utils/functions";
import { NUM_OF_DIGITS } from "./utils/consts";

function App() {
  const [values, setValues] = useState<string[]>(
    new Array(NUM_OF_DIGITS).fill("")
  );
  const [lastDigit, setLastDigit] = useState<number | undefined>(undefined);

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
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleInput(e, values, setValues)
              }
              id={`${index}`}
              key={index}
              slotProps={{ htmlInput: { maxLength: 1 } }}
              value={values[index]}
              className="inputBox"
              onPaste={(e: ClipboardEvent) => handlePaste(e, values, setValues)}
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
          onClick={() => handleClear(setValues, setLastDigit)}
        >
          Clear
        </Button>
      </Box>

      <Typography>{lastDigit}</Typography>
    </Box>
  );
}

export default App;
