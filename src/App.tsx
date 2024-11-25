import { ClipboardEvent, KeyboardEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getLastDigit, saveData } from "./axios/useAxios";
import { handleClear, handleInput, handlePaste } from "./utils/functions";
import { NUM_OF_DIGITS } from "./utils/consts";
import {
  appContainer,
  appTitle,
  buttonContainer,
  controlButton,
  inputBox,
} from "./utils/Style";

const App = () => {
  const [values, setValues] = useState<string[]>(
    new Array(NUM_OF_DIGITS).fill("")
  );
  const [lastDigit, setLastDigit] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    const lastDigit: string | undefined = await getLastDigit(values.join(""));

    if (lastDigit) {
      setLastDigit(lastDigit);

      await saveData(values.join(""), lastDigit.toString());
    }
  };

  return (
    <Box sx={appContainer}>
      <Typography sx={appTitle}>{`Enter ${NUM_OF_DIGITS} digits`}</Typography>
      <Box>
        {Array.from({ length: NUM_OF_DIGITS }).map((_, index) => {
          return (
            <TextField
              sx={inputBox}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleInput(e, values, setValues)
              }
              id={`${index}`}
              key={`input-${index}`}
              slotProps={{ htmlInput: { maxLength: 1 } }}
              value={values[index]}
              className="inputBox"
              onPaste={(e: ClipboardEvent) => handlePaste(e, values, setValues)}
            />
          );
        })}
      </Box>
      <Box sx={buttonContainer}>
        <Button
          variant="outlined"
          sx={controlButton}
          disabled={values.some((value) => value === "")}
          onClick={handleClick}
        >
          Calculate
        </Button>
        <Button
          variant="outlined"
          sx={{ ...controlButton, ...{ color: "red", borderColor: "red" } }}
          disabled={values.every((value) => value === "")}
          onClick={() => handleClear(setValues, setLastDigit)}
        >
          Clear
        </Button>
      </Box>

      <Typography>{lastDigit}</Typography>
    </Box>
  );
};

export default App;
