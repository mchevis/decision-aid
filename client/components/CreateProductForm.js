import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

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

  const scrapingSources = ["Amazon", "Wayfair"];

  const onSubmit = async (data, e) => {
    const { data: product } = await axios.post(`/api/products`, {
      projectId,
      ...data,
    });

    if (scrapingSources.find((source) => source === data.source)) {
      await axios.post("/api/productAttributes/scrape", {
        productId: product.id,
        source: data.source,
      });
    }

    navigate(-1);
  };

  const watchSource = watch(["source"]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "80vw" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      id="create-product-form"
    >
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        Add Product Form
      </Typography>
      <TextField
        id="source"
        select
        label="Source/Website"
        defaultValue=""
        helperText={
          watchSource[0] && !scrapingSources.find((s) => s === watchSource[0])
            ? `FYI: we can't fetch data from ${watchSource} automatically...you can still enter data manually!`
            : ""
        }
        required
        {...register("source", { required: true })}
        error={!!errors?.source}
      >
        <MenuItem value={"Amazon"}>Amazon</MenuItem>
        <MenuItem value={"Wayfair"}>Wayfair</MenuItem>
        <MenuItem value={"West Elm"}>West Elm</MenuItem>
      </TextField>

      <TextField
        required
        id="url"
        label="Product URL"
        defaultValue=""
        fullWidth
        helperText={
          !!errors?.url
            ? "This field is required"
            : "For accurate results, please select all product options (e.g. color, size) on the site before copying the URL."
        }
        {...register("url", { required: true })}
        error={!!errors?.url}
      />
      <Grid
        container
        spacing={1}
        sx={{ m: 2, alignItems: "center", justifyContent: "center" }}
      >
        <Grid item>
          <Button size="medium" onClick={() => navigate(-1)} variant="outlined">
            Cancel
          </Button>
        </Grid>
        <Grid item>
          {isSubmitting ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Fetching Product Info
            </LoadingButton>
          ) : (
            <Button
              size="medium"
              variant="contained"
              // sx={{ m: 2 }}
              type="submit"
              disabled={isSubmitting}
              form="create-product-form"
            >
              Add Product
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateProductForm;
