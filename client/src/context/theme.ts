import { createTheme } from "@mui/material";

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
      secondary: "lightgrey",
    },
  },
  typography: {
    fontFamily: ["Roboto Mono", "monospace"].join(","),
  }
});

