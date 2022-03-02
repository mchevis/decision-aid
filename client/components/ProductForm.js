import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("Name-priority")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="product--form">
      <label>Source:</label>
      <input
        defaultValue={product.brand}
        {...register("source", { required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <label>URL:</label>
      <input
        defaultValue={product.url}
        {...register("url", { required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}

      {productAttributes.map((pa) => (
        <div key={pa.id}>
          <h4>{pa.attribute.name}</h4>
          <div className="product--form--attribute">
            <label>Value:</label>
            <input
              defaultValue={pa.value}
              {...register(`${pa.attribute.name}-value`, { required: true })}
            />
            <label>Priority:</label>
            <select
              name="Priority"
              defaultValue={
                pa.attribute.priority || pa.attribute.priority === 0
                  ? pa.attribute.priority
                  : -1
              }
              {...register(`${pa.attribute.name}-priority`, { required: true })}
            >
              <option value={-1} hidden disabled>
                Select a priority
              </option>
              <option value={0}>P0 - Most important</option>
              <option value={1}>P1</option>
              <option value={2}>P2</option>
              <option value={3}>P3</option>
              <option value={4}>P4 - Least important</option>
              <option value={-99}>I don't want to prioritize this</option>
            </select>
          </div>
        </div>
      ))}
      <input type="submit" />
    </form>
  );
};

export default ProductForm;
