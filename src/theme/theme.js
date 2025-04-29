import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Light green evocative of nature
    },
    secondary: {
      main: "#8BC34A", // Complementary green shade
    },
    background: {
      default: "#F1F8E9", // Light greenish background
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.2)",
    "0px 1px 5px rgba(0, 0, 0, 0.2)",
    "0px 3px 5px rgba(0, 0, 0, 0.2)",
    // ...other shadows
  ],
});

export default theme;