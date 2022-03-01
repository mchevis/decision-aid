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
    <div className="productAttributes--list">
      {productAttributes.map((prodAttr) => {
        const attribute = attributes.find(
          (attr) => attr.id === prodAttr.attributeId
        );

        return (
          <div key={prodAttr.id} className="productAttribute">
            {attribute?.name === "Image" ? (
              <img src={prodAttr.value} className="productImage"></img>
            ) : (
              prodAttr.value
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductAttributes;
