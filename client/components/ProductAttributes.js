import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductAttributes = ({ productId, projectId, productUrl }) => {
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

  const total =
    attributes.length > 0
      ? attributes.reduce((total, attr) => {
          if (total === "DESQUALIFIED") {
            return total;
          }
          const prodAttr = productAttributes.find(
            (pa) => pa.attributeId === attr.id
          );
          if (attr.criteriaType === "informational") {
            return 0;
          }
          const weight = 5 - attr.priority;
          if (attr.criteriaType === "lessThanOrEqualTo") {
            if (Number(prodAttr.value) <= Number(attr.criteriaValue)) {
              return total + weight;
            } else {
              return "DESQUALIFIED";
            }
          }
          if (attr.criteriaType === "minMax") {
            return total + 10;
          }
        }, 0)
      : 0;

  return (
    <div className="productAttributes--list">
      {attributes.map((attribute) => {
        const prodAttr =
          productAttributes.find((pa) => attribute.id === pa.attributeId) || "";

        return (
          <div
            key={attribute.id}
            className={`productAttribute ${attribute?.name}`}
          >
            {attribute?.name === "Image" ? (
              <img src={prodAttr.value} className="productImage"></img>
            ) : attribute?.name === "Name" ? (
              <a href={productUrl} target="_blank">
                {prodAttr.value}
              </a>
            ) : (
              prodAttr.value
            )}
          </div>
        );
      })}
      <hr className="divider" />
      <div className="total">{total}</div>
    </div>
  );
};

export default ProductAttributes;
