import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
    secondary: {
      main: "#000000",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 200,
        md: 450,
        lg: 900,
        xl: 1536,
      },
    },
  },
});

export default theme;
