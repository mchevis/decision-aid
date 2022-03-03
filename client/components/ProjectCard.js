import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  capitalize,
} from "@mui/material";

const ProjectCard = ({ id }) => {
  const navigate = useNavigate();

  const [project, setProject] = useState({});

  useEffect(async () => {
    const { data: project } = await axios.get(`/api/projects/${id}`);
    setProject(project);
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {capitalize(project.status || "")}
        </Typography>
        <Typography variant="h5" component="div">
          {project.name} ({project.products?.length})
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {capitalize(project.category || "")} |{" "}
          {capitalize(project.subCategory || "")}
        </Typography>
        <Typography variant="body2">
          {project.status === "completed" ? "Winner: " : "In the lead: "}
          Product X
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          VIEW DETAILS
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
