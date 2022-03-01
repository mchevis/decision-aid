import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductAttributes from "./ProductAttributes";

const CompTable = ({ projectId }) => {
  const [attributes, setAttributes] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    if (projectId) {
      const { data: products } = await axios.get(
        `/api/products/project/${projectId}`
      );
      setProducts(products);

      const { data: attributes } = await axios.get(
        `/api/attributes/project/${projectId}`
      );
      setAttributes(attributes);
    }
  }, [projectId]);

  return (
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
            <ProductAttributes productId={product.id} projectId={projectId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompTable;
