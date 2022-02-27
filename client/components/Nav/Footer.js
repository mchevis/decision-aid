import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";

function Copyright() {
  return (
    <Typography variant="body2" color="black" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.copyright.gov/">
        Decison Aid
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          marginTop: "auto",
          borderTop: "ridge 1px gray",
        }}
        component="footer"
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="black"
          component="p"
        >
          Marina F. Chevis
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
