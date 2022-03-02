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
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
    },
    reset,
  } = useForm();

  const [product, setProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);

  useEffect(async () => {
    const { data: product } = await axios.get(`/api/products/${id}`);
    setProduct(product);

    const { data: productAttributes } = await axios.get(
      `/api/productAttributes/product/${id}`
    );
    setProductAttributes(productAttributes);

    const { data: attributes } = await axios.get(
      `/api/attributes/project/${product.projectId}`
    );
    setAttributes(attributes);

    reset();
  }, []);

  useEffect(
    () => isSubmitSuccessful && alert("Submitted!"),
    [isSubmitSuccessful]
  );

  const onSubmit = async (data, e) => {
    const productBody = { source: data.source, url: data.url };
    await axios.put(`/api/products/${id}`, productBody);
    setProduct({ ...product, productBody });

    const dirtyAttributes = Object.entries(data)
      .filter(
        (el) => el[0] !== "source" && el[0] !== "url" && dirtyFields[el[0]]
      )
      .map((el) => [...el[0].split("-"), el[1]]);

    let pas;
    await Promise.all(
      dirtyAttributes.map((att) => {
        if (att[1] === "priority") {
          const prio = att[2] === "-99" ? 0 : att[2];
          axios.put(`/api/attributes/${att[0]}`, { priority: prio });
          setAttributes(
            attributes.map((att) =>
              att.id === Number(att[0]) ? { ...att, priority: prio } : att
            )
          );
        } else if (att[0] === "new" && att[1] === "value") {
          pas = axios.post(`/api/productAttributes/`, {
            productId: product.id,
            attributeId: att[2],
            value: att[3],
          });
        } else if (att[1] === "value") {
          axios.put(`/api/productAttributes/${att[0]}`, {
            value: att[3],
          });
          setProductAttributes(
            productAttributes.map((pa) =>
              pa.id === Number(att[0]) ? { ...pa, value: att[3] } : pa
            )
          );
        }
      })
    );
    if (pas) setProductAttributes([...productAttributes, pas]);
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="product--edit--page">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="product--form"
      >
        <label>Source:</label>
        <input defaultValue={product.source} {...register("source")} />
        {errors.source && <span>This field is required</span>}
        <label>URL:</label>
        <input defaultValue={product.url} {...register("url")} />
        {errors.url && <span>This field is required</span>}

        {attributes.map((attribute) => {
          const pa = productAttributes.find(
            (pa) => pa.attributeId === attribute.id
          );
          return (
            <div key={attribute.id}>
              <h4>{attribute.name}</h4>
              <div className="product--form--attribute">
                <label>Value:</label>
                <input
                  defaultValue={pa?.value || ""}
                  {...register(`${pa?.id || "new"}-value-${attribute.id}`)}
                />
                <label>Priority:</label>
                <select
                  name="Priority"
                  defaultValue={attribute.priority ? attribute.priority : -99}
                  {...register(`${attribute.id}-priority`)}
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
          );
        })}
        <input type="submit" disabled={isSubmitting || !isDirty} />
      </form>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default ProductForm;
