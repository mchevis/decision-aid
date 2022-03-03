import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductAttributes from "./ProductAttributes";
import CompTable from "./CompTable";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  capitalize,
} from "@mui/material";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});

  useEffect(async () => {
    const { data: project } = await axios.get(`/api/projects/${id}`);
    setProject(project);
  }, []);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={2} container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h4" component="div">
            Project Details
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            Name: {project.name}
            <br />
            Status: {project.status}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" component="div">
          Comparison Table
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/${project.id}/createProduct`)}
        >
          ADD PRODUCT
        </Button>
        <CompTable projectId={project.id} />
      </Grid>
    </Grid>
  );
};

export default ProjectDetails;
