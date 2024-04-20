import {
  ReadingBackgroundColour,
  ReadingBorderColour,
} from "../types/enums/ReadingBackgroundColorEnum";

export const getReadingStyles = (reading: number) =>
  reading < 4
    ? {
        background: ReadingBackgroundColour.Low,
        border: ReadingBorderColour.Low,
      }
    : reading >= 4 && reading < 10
    ? {
        background: ReadingBackgroundColour.Medium,
        border: ReadingBorderColour.Medium,
      }
    : {
        background: ReadingBackgroundColour.High,
        border: ReadingBorderColour.High,
      };
