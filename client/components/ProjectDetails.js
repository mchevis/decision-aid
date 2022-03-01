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
      <div className="comp--table">
        <div className="comp--products">
          <h2>Products:</h2>
          <div className="products--list">
            <div className="productsList--productItem">
              <div className="productAttribute">Brand</div>
              {attributes.map((attribute) => (
                <div
                  key={attribute.id}
                  className={`productAttribute attributeName--${attribute.name}`}
                >
                  {attribute.name}
                </div>
              ))}
            </div>
            {products.map((product) => (
              <div key={product.id} className="productsList--productItem">
                <p className="productAttribute">{product.brand}</p>
                <ProductAttributes
                  productId={product.id}
                  projectId={project.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
