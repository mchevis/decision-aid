import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);

  useEffect(async () => {
    const { data: product } = await axios.get(`/api/products/${id}`);
    setProduct(product);

    const { data: productAttributes } = await axios.get(
      `/api/productAttributes/product/${id}`
    );
    setProductAttributes(productAttributes);
  }, []);

  return (
    <div>
      <div>Source: {product.brand}</div>
      <div>URL: {product.url}</div>
      <div>
        {productAttributes.map((pa) => (
          <div>
            <h4>{pa.attribute.name}</h4>
            <ul>
              <li>{pa.value}</li>
              <li>
                {pa.attribute.priority || pa.attribute.priority === 0
                  ? `P${pa.attribute.priority}`
                  : ""}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductForm;
