import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateProductForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  useEffect(
    () => isSubmitSuccessful && alert("Submitted!"),
    [isSubmitSuccessful]
  );

  const onSubmit = async (data, e) => {
    const { data: product } = await axios.post(`/api/products`, {
      projectId,
      ...data,
    });

    if (data.source === "Amazon") {
      await axios.post("/api/productAttributes/scrape", {
        productId: product.id,
        source: data.source,
      });
    }

    navigate(-1);
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="product--create--page">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="product--create--form"
      >
        <label>Source:</label>
        <input defaultValue={""} {...register("source", { required: true })} />
        {errors.source && <span>This field is required</span>}
        <label>URL:</label>
        <input defaultValue={""} {...register("url", { required: true })} />
        {errors.url && <span>This field is required</span>}
        <input type="submit" disabled={isSubmitting} />
      </form>
      <div>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateProductForm;
