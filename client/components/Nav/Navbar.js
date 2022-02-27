import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";

const Navbar = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ height: "70px" }}>
            <Toolbar>
              <Link to="home">
                <Box
                  component={"img"}
                  src={"https://i.postimg.cc/dQpc1HbS/grace-paint.png"}
                  sx={{
                    height: 60,
                    width: 120,
                    marginTop: 0.5,
                    marginLeft: 2,
                  }}
                />
              </Link>
              <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  color="secondary"
                  sx={{ borderRadius: 2 }}
                  onClick={console.log("nav click")}
                >
                  <Typography
                    variant="p"
                    component="div"
                    sx={{
                      fontSize: "16px",
                      marginLeft: 1,
                      marginRight: 1,
                      letterSpacing: "0.1rem",
                    }}
                  >
                    PROJECTS
                  </Typography>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Navbar;
