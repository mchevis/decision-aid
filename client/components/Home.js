import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh" }}>
        <Card className="main_page_top">
          <CardMedia
            image={
              "https://i.postimg.cc/Kjg3xvsf/spacejoy-9-M66-C-w-To-M-unsplash.jpg"
            }
            className="living_room_image"
          >
            <CardContent>
              <Typography component="p">Color Your World</Typography>
              <Box textAlign="center">
                <Link to={`/browse`}>
                  <Button variant="outlined" color="primary" size="large">
                    <Typography component="h1"> Shop </Typography>
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </CardMedia>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
