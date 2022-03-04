import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  capitalize,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

const AttributesBar = () => {
  return (
    <Card>
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={3}
          alignItems="left"
          maxWidth={300}
          minWidth={150}
        >
          <Grid item xs={3}>
            <Box sx={{ height: 150 }}>
              <Typography
                variant="body1"
                component="div"
                align="left"
              ></Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                maxWidth: 250,
                height: 48 + 5.6,
              }}
            >
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
                color="text.secondary"
              >
                Name
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              Source
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              Price
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              Ratings
            </Typography>
          </Grid>
          <Divider variant="middle" sx={{ width: 180, pt: 2 }} />
          <Grid item xs={2}>
            <Typography variant="body1" color="text.secondary">
              Total
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", m: 2.5 }}>
        <Button
          size="small"
          //   onClick={() => navigate(`/product/${productId}`)}
          variant="contained"
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AttributesBar;
