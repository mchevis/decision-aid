import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import { Grid } from "@mui/material";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    const { data: projects } = await axios.get("/api/projects");
    setProjects(projects);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      {projects.map((project) => (
        <Grid item xs={12} sm={3} key={project.id}>
          <ProjectCard id={project.id} />
        </Grid>
      ))}
      <Grid item xs={2} />
    </Grid>
  );
};

export default Home;
