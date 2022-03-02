import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    reset,
  } = useForm();

  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);

  useEffect(async () => {
    const { data: product } = await axios.get(`/api/products/${id}`);
    setProduct(product);

    const { data: productAttributes } = await axios.get(
      `/api/productAttributes/product/${id}`
    );
    setProductAttributes(productAttributes);

    reset();
  }, []);

  useEffect(
    () => isSubmitSuccessful && alert("Submitted!"),
    [isSubmitSuccessful]
  );

  const onSubmit = async (data, e) => {
    const productBody = { brand: data.source, url: data.url };
    const attributes = Object.entries(data)
      .filter((el) => el[0] !== "source" && el[0] !== "url")
      .map((el) => [...el[0].split("-"), el[1]]);

    const result = await axios.put(`/api/products/${id}`, productBody);
    await Promise.all(
      attributes.map((att) => {
        if (att[1] === "priority") {
          const prio = att[2] === "-99" ? 0 : att[2];
          axios.put(`/api/attributes/${att[0]}`, { priority: prio });
        } else if (att[1] === "value") {
          axios.put(`/api/productAttributes/${att[0]}`, {
            value: att[2],
          });
        }
      })
    );
    return result;
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="product--edit--page">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="product--form"
      >
        <label>Source:</label>
        <input defaultValue={product.brand} {...register("source")} />
        {errors.exampleRequired && <span>This field is required</span>}
        <label>URL:</label>
        <input defaultValue={product.url} {...register("url")} />
        {errors.exampleRequired && <span>This field is required</span>}

        {productAttributes.map((pa) => (
          <div key={pa.id}>
            <h4>{pa.attribute.name}</h4>
            <div className="product--form--attribute">
              <label>Value:</label>
              <input defaultValue={pa.value} {...register(`${pa.id}-value`)} />
              <label>Priority:</label>
              <select
                name="Priority"
                defaultValue={
                  pa.attribute.priority ? pa.attribute.priority : -99
                }
                {...register(`${pa.attributeId}-priority`)}
              >
                <option value={-99} hidden disabled>
                  Select a priority
                </option>
                <option value={5}>5 - Most important</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1 - Least important</option>
                <option value={0}>I don't want to prioritize this</option>
              </select>
            </div>
          </div>
        ))}
        <input type="submit" disabled={isSubmitting} />
      </form>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default ProductForm;
