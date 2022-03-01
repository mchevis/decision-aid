import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "./ProjectCard";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    const { data: projects } = await axios.get("/api/projects");
    setProjects(projects);
  }, []);

  return (
    <div>
      <h1>Decision Aid</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
            <ProjectCard id={project.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
