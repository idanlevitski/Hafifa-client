import { ClipboardEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { NUM_OF_DIGITS } from "./consts";

export const handleInput = (
  e: KeyboardEvent<HTMLInputElement>,
  values: string[],
  setValues: Dispatch<SetStateAction<string[]>>
) => {
  const elementIndex = parseInt((e.target as HTMLInputElement).id);

  const newValues: string[] = [...values];

  if (/^\d$/.test(e.key)) {
    newValues[elementIndex] = e.key;
    setValues(newValues);

    document.getElementById(`${elementIndex + 1}`)?.focus();
  }

  if (e.key === "Backspace") {
    newValues[elementIndex] = "";
    setValues(newValues);

    document.getElementById(`${elementIndex - 1}`)?.focus();
  }
};

export const handleClear = (
  setValues: Dispatch<SetStateAction<string[]>>,
  setLastDigit: Dispatch<SetStateAction<string | undefined>>
) => {
  setValues(new Array(NUM_OF_DIGITS).fill(""));
  setLastDigit(undefined);
};

export const handlePaste = (
  e: ClipboardEvent,
  values: string[],
  setValues: Dispatch<SetStateAction<string[]>>
) => {
  if (e.clipboardData) {
    const newValues: string[] = [...values];
    const pastedData = e.clipboardData
      .getData("text")
      .split("")
      .filter((digit) => /^\d$/.test(digit));

    pastedData.forEach((digit: string, index: number) => {
      newValues[index] = digit;
    });

    setValues(newValues);
  }
};
