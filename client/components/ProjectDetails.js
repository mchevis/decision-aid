import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductAttributes from "./ProductAttributes";
import CompTable from "./CompTable";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <button onClick={() => navigate(`/${project.id}/createProduct`)}>
        Add a Product
      </button>
      <div className="comp--table">
        <CompTable projectId={project.id} />
      </div>
    </div>
  );
};

export default ProjectDetails;
