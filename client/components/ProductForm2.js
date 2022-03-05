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
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const ProductForm2 = ({ productId, editting, setEditting }) => {
  //   const { productId } = useParams();
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
    const { data: product } = await axios.get(`/api/products/${productId}`);
    setProduct(product);

    const { data: productAttributes } = await axios.get(
      `/api/productAttributes/product/${productId}`
    );
    setProductAttributes(productAttributes);

    const { data: attributes } = await axios.get(
      `/api/attributes/project/${product.projectId}`
    );
    setAttributes(attributes);

    reset({ source: product.source, url: product.url });
  }, []);

  useEffect(
    () => isSubmitSuccessful && alert("Submitted!"),
    [isSubmitSuccessful]
  );

  const onSubmit = async (data, e) => {
    const productBody = { source: data.source, url: data.url };
    await axios.put(`/api/products/${productId}`, productBody);
    setProduct({ ...product, productBody });

    const dirtyAttributes = Object.entries(data)
      .filter(
        (el) => el[0] !== "source" && el[0] !== "url" && dirtyFields[el[0]]
      )
      .map((el) => [...el[0].split("-"), el[1]]);

    let pas;
    await Promise.all(
      dirtyAttributes.map((att) => {
        if (att[0] === "new" && att[1] === "value") {
          pas = axios.post(`/api/productAttributes/`, {
            productId,
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

    setEditting({ ...editting, [productId]: false });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      id="edit-product-form"
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ mr: 2, mt: 2, width: 1 }}>
          {/* <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Edit Attributes
          </Typography> */}

          {/* FORM FIELDS  */}
          <TextField
            required
            id="url"
            label="Product URL"
            defaultValue="Product URL"
            helperText={!!errors[`url`] ? "This field is required" : ""}
            {...register("url", { required: true })}
            error={!!errors[`url`]}
            sx={{ width: 1 }}
          />
          <TextField
            required
            id="source"
            label="Website"
            defaultValue="Website"
            helperText={!!errors[`source`] ? "This field is required" : ""}
            {...register("source", { required: true })}
            error={!!errors[`source`]}
            sx={{ width: 1 }}
          />

          {attributes.map((attribute) => {
            const pa = productAttributes.find(
              (pa) => pa.attributeId === attribute.id
            );
            return (
              <TextField
                required
                key={attribute.id}
                id={`${pa?.id || "new"}-value-${attribute.id}`}
                label={attribute.name}
                defaultValue={pa?.value || ""}
                helperText={!!errors[`source`] ? "This field is required" : ""}
                {...register(`${pa?.id || "new"}-value-${attribute.id}`)}
                error={!!errors[`${pa?.id || "new"}-value-${attribute.id}`]}
                sx={{ width: 1 }}
              />
            );
          })}
        </CardContent>
        <CardActions>
          <Grid
            container
            spacing={1}
            sx={{
              mb: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Button
                size="small"
                onClick={() => setEditting({ ...editting, [productId]: false })}
                variant="outlined"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              {isSubmitting ? (
                <LoadingButton
                  size="small"
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Save
                </LoadingButton>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  form="edit-product-form"
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductForm2;
