import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import AttributesBar from "./AttributesBar";
import { Grid } from "@mui/material";

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
      <div className="products--list">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <AttributesBar />
          </Grid>
          <Grid item xs={10} container spacing={2}>
            {products.map((product) => (
              <Grid item xs={3} key={product.id}>
                <ProductCard
                  productId={product.id}
                  projectId={projectId}
                  productUrl={product.url}
                  productSource={product.source}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CompTable;

{
  /* <div className="productsList--productItem attributes">
          <div className="productAttribute attributeName Source">Source</div>
          {attributes.map((attribute) => (
            <div
              key={attribute.id}
              className={`productAttribute attributeName ${attribute.name}`}
            >
              <div>{attribute.name}</div>
              <div className={attribute.criteriaValue ? "criteria" : ""}>
                {attribute.criteriaValue}
              </div>
              <div className={attribute.priority ? "priority" : ""}>
                {attribute.priority ? attribute.priority : ""}
              </div>
            </div>
          ))}
          <hr className="divider" />
          <div className="total">Total</div>
        </div> */
}
