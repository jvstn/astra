import { createTheme } from "@mui/material";
import {createContext} from 'react'

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
      dark: "#6E6F71",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#09090C",
      paper: "#111317"
    },
    text: {
      primary: "#6E6F71",
      secondary: "#9E9E9E",
    },
  },
});

