import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAttributes = ({
  productId,
  projectId,
  productUrl,
  productSource,
}) => {
  const [productAttributes, setProductAttributes] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const navigate = useNavigate();

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

  const attributeRankings = attributes.map((attr) => {
    return {
      ...attr,
      attrRanking: attr.productAttributes
        .map((pa) => pa.value)
        .sort((a, b) => {
          if (attr.criteriaValue === "min") {
            return Number(a) - Number(b);
          } else if (attr.criteriaValue === "max") {
            return Number(b) - Number(a);
          } else {
            return 0;
          }
        }),
    };
  });

  const total = attributes.reduce((total, attr) => {
    if (total === "DISQUALIFIED") {
      return total;
    }
    const prodAttr = productAttributes.find((pa) => pa.attributeId === attr.id);
    if (!prodAttr || !prodAttr.value || attr.criteriaType === "informational") {
      return total;
    }

    const weight = attr.priority;
    if (attr.criteriaType === "lessThanOrEqualTo") {
      if (Number(prodAttr.value) <= Number(attr.criteriaValue)) {
        return total + weight;
      } else {
        return "DISQUALIFIED";
      }
    }
    if (attr.criteriaType === "minMax") {
      const attrRanking = attributeRankings?.find(
        (att) => att.id === attr.id
      ).attrRanking;
      const idx =
        attrRanking?.findIndex((ar) => Number(ar) === Number(prodAttr?.value)) +
        1;

      return total + weight * (5 - idx);
    }
  }, 0);

  return (
    <div className="productAttributes--list">
      <p className="productAttribute">{productSource}</p>
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
              <a
                href={
                  productUrl.startsWith("http") ? productUrl : `//${productUrl}`
                }
                target="_blank"
              >
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
      <button
        className="product--edit"
        onClick={() => navigate(`/product/${productId}`)}
      >
        Edit
      </button>
    </div>
  );
};

export default ProductAttributes;
