import { createTheme } from "@mui/material";
import {createContext} from 'react'

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0077EF",
      dark: "#6E6F71",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#0A1929",
      paper: "#132F4C",
    },
    text: {
      primary: "#fff",
      secondary: "#6E6F71",
    },
  },
  typography: {
    fontFamily: ["Roboto Mono", "monospace"].join(","),
  }
});

