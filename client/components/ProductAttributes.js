import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductAttributes = ({ productId, projectId }) => {
  const [productAttributes, setProductAttributes] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(async () => {
    const { data: productAttributes } = await axios.get(
      `/api/productAttributes/product/${productId}`
    );
    setProductAttributes(productAttributes);

    const { data: attributes } = await axios.get(
      `/api/attributes/project/${projectId}`
    );
    setAttributes(attributes);
  }, []);

  return (
    <div>
      <h3>Product Attributes:</h3>
      <ul>
        {productAttributes.map((prodAttr) => {
          const attribute = attributes.find(
            (attr) => attr.id === prodAttr.attributeId
          );

          return (
            <li key={prodAttr.id}>
              {attribute?.name}:{" "}
              {attribute?.name === "Image" ? (
                <img src={prodAttr.value} className="productImage"></img>
              ) : (
                prodAttr.value
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductAttributes;
