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

    const scrapingSources = ["Amazon", "Wayfair"];
    if (scrapingSources.find((source) => source === data.source)) {
      await axios.post("/api/productAttributes/scrape", {
        productId: product.id,
        source: data.source,
      });
    }

    navigate(-1);
  };

  const onError = (errors, e) => console.log(errors, e);

  const watchSource = watch(["source"]);

  return (
    <div className="product--create--page">
      <div>{isSubmitting ? "Please wait. Fetching product info..." : ""}</div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="product--create--form"
      >
        <div className="fieldWithNote">
          <label>Source:</label>
          <select
            name="Source"
            defaultValue={0}
            {...register("source", { required: true })}
          >
            <option value={0} disabled>
              Select a source
            </option>
            <option value={"Amazon"}>Amazon</option>
            <option value={"Wayfair"}>Wayfair</option>
            <option value={"West Elm"}>West Elm</option>
          </select>
          {watchSource[0] === "West Elm" ? (
            <small>
              FYI: we can't fetch data from {watchSource} automatically...you
              can still enter data manually!
            </small>
          ) : (
            ""
          )}
          {errors.source && <span>This field is required</span>}
        </div>
        <div className="fieldWithNote">
          <label>URL:</label>
          <small>
            For accurate results, please select all product options (e.g. color,
            size) on the site before copying the URL
          </small>
          <input defaultValue={""} {...register("url", { required: true })} />
          {errors.url && <span>This field is required</span>}
        </div>
        <input type="submit" disabled={isSubmitting} />
      </form>
      <div>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateProductForm;
