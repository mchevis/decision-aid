import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductAttributes from "./ProductAttributes";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const { data: project } = await axios.get(`/api/projects/${id}`);
    setProject(project);

    const { data: products } = await axios.get(`/api/products/project/${id}`);
    setProducts(products);

    const { data: attributes } = await axios.get(
      `/api/attributes/project/${id}`
    );
    setAttributes(attributes);
  }, []);

  return (
    <div>
      <h1>Project Details</h1>
      <h2>Info:</h2>
      <ul>
        {Object.entries(project).map((projectProp) => (
          <li key={projectProp[0]}>
            {projectProp[0]}: {projectProp[1]}
          </li>
        ))}
      </ul>
      <h2>Attributes:</h2>
      <ul>
        {attributes.map((attribute) => (
          <li key={attribute.id}>{attribute.name}</li>
        ))}
      </ul>
      <h2>Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.id} {product.brand}
            <ProductAttributes productId={product.id} projectId={project.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
