import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  capitalize,
  Box,
  Divider,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const AttributesBar = ({ attributes, projectId }) => {
  const navigate = useNavigate();

  const priorities = ["n/a", "low", "medium", "high"];
  const priorityDots = (prio) => {
    const numDots = priorities.findIndex((p) => p === prio) || 0;
    const dots = numDots > 0 ? new Array(numDots).fill("★") : 0;
    return dots;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
      }}
    >
      <CardContent>
        <Grid container direction="column" spacing={3} alignItems="left">
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
          <Grid item xs={2} container>
            <Grid item xs={4} sx={{ width: 1 / 3 }}>
              <Typography variant="body2" color="text.secondary">
                Price
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  backgroundColor: "secondary.light",
                }}
              >
                <Typography variant="body2" color="text.primary" align="center">
                  {attributes.find((a) => a.name === "Price")?.criteriaValue}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {priorityDots(
                    attributes.find((a) => a.name === "Ratings")?.priority
                  ) &&
                    priorityDots(
                      attributes.find((a) => a.name === "Price")?.priority
                    ).map((dot) => dot)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={2} container>
            <Grid item xs={4} sx={{ width: 1 / 3 }}>
              <Typography variant="body2" color="text.secondary">
                Ratings
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  backgroundColor: "secondary.light",
                }}
              >
                <Typography variant="body2" color="text.primary" align="center">
                  {attributes.find((a) => a.name === "Ratings")?.criteriaValue}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {priorityDots(
                    attributes.find((a) => a.name === "Ratings")?.priority
                  ) &&
                    priorityDots(
                      attributes.find((a) => a.name === "Ratings")?.priority
                    ).map((dot) => dot)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%", pt: 2 }} textAlign={"center"}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" color="text.secondary">
              Total
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container spacing={0} sx={{ mb: 2 }} justifyContent={"center"}>
          <Grid item xs={12}>
            <Button
              size="small"
              onClick={() => navigate(`/${projectId}/editAttributes`)}
              variant="contained"
              sx={{ width: "100%" }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default AttributesBar;
