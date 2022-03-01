import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProjectCard = ({ id }) => {
  const [project, setProject] = useState({});

  useEffect(async () => {
    const { data: project } = await axios.get(`/api/projects/${id}`);
    setProject(project);
  }, []);

  return (
    <div>
      <ul>
        {Object.entries(project).map((projectProp) => (
          <li key={projectProp[0]}>
            {projectProp[0]}: {projectProp[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
