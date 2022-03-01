import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductAttributes from "./ProductAttributes";
import CompTable from "./CompTable";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(async () => {
    const { data: project } = await axios.get(`/api/projects/${id}`);
    setProject(project);
  }, []);

  return (
    <div className="project-details--page">
      <h1>Project Details</h1>
      <div className="project--info">
        <h2>Info</h2>
        <ul>
          {Object.entries(project).map((projectProp) => (
            <li key={projectProp[0]}>
              {projectProp[0]}: {projectProp[1]}
            </li>
          ))}
        </ul>
      </div>
      <div className="comp--table">
        <CompTable projectId={project.id} />
      </div>
    </div>
  );
};

export default ProjectDetails;
