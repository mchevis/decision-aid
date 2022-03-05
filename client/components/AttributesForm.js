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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const AttributesForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      dirtyFields,
      isDirty,
    },
    reset,
  } = useForm();

  useEffect(
    () => isSubmitSuccessful && alert("Submitted!"),
    [isSubmitSuccessful]
  );

  const [attributes, setAttributes] = useState([]);
  const [criteriaTypePicklist, setCriteriaTypePicklist] = useState([]);

  useEffect(async () => {
    const { data: attributes } = await axios.get(
      `/api/attributes/project/${projectId}`
    );
    setAttributes(attributes);

    const { data: picklist } = await axios.get(
      `/api/attributes/picklist/criteriaType`
    );
    setCriteriaTypePicklist(picklist);

    reset();
  }, []);

  const onSubmit = async (data, e) => {
    const dirtyAttributes = Object.entries(data).filter(
      (el) => dirtyFields[el[0]]
    );

    //TODO: MAY NEED TO REVISIT
    await Promise.all(
      dirtyAttributes.map((att) => {
        const attId = att[0].split("-")[0];
        const attName = att[0].split("-")[1];
        const attValue = att[1];
        axios.put(`/api/attributes/${attId}`, { [attName]: attValue });
      })
    );

    navigate(-1);
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
      id="edit-attributes-form"
    >
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        Edit Attributes
      </Typography>

      {/* FORM FIELDS */}
      <Grid container spacing={3}>
        {attributes
          .sort((a) => a.name)
          .map((att) => (
            <Grid item key={att.id} xs={3} sx={{ width: "100%" }}>
              <Card>
                <CardContent sx={{ mr: 2, mt: 2 }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    gutterBottom
                    textAlign={"center"}
                  >
                    {att.name}
                  </Typography>
                  <TextField
                    select
                    required
                    id={`${att.id}-priority`}
                    label="Level of Priority"
                    defaultValue={att.priority}
                    helperText={
                      !!errors[`${att.id}-priority`]
                        ? "This field is required"
                        : ""
                    }
                    {...register(`${att.id}-priority`, { required: true })}
                    error={!!errors[`${att.id}-priority`]}
                    sx={{ width: 1 }}
                  >
                    <MenuItem value={"low"}>Low</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                    <MenuItem value={"n/a"}>Not Applicable</MenuItem>
                  </TextField>
                  <TextField
                    select
                    required
                    id={`${att.id}-criteriaType`}
                    label="Criteria Type"
                    defaultValue={att.criteriaType}
                    helperText={
                      !!errors[`${att.id}-criteriaType`]
                        ? "This field is required"
                        : ""
                    }
                    {...register(`${att.id}-criteriaType`, { required: true })}
                    error={!!errors[`${att.id}-criteriaType`]}
                    sx={{ width: 1 }}
                  >
                    {criteriaTypePicklist?.map((criteria) => (
                      <MenuItem key={criteria} value={criteria}>
                        {criteria}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id={`${att.id}-criteriaValue`}
                    label="Criteria Value"
                    defaultValue={att.criteriaValue || ""}
                    helperText={
                      "Leave empty for Informational. For Min/Max: 'min' or 'max'. For boolean: 'true' or 'false'"
                    }
                    {...register(`${att.id}-criteriaValue`)}
                    error={!!errors[`${att.id}-criteriaValue`]}
                    sx={{ width: 1 }}
                  />
                  <TextField
                    select
                    required
                    id={`${att.id}-isRequired`}
                    label="Criteria MUST be met"
                    defaultValue={att.isRequired}
                    helperText={
                      !!errors[`${att.id}-isRequired`]
                        ? "This field is required"
                        : ""
                    }
                    {...register(`${att.id}-isRequired`, { required: true })}
                    error={!!errors[`${att.id}-isRequired`]}
                    sx={{ width: 1 }}
                  >
                    <MenuItem value={"true"}>Yes</MenuItem>
                    <MenuItem value={"false"}>No</MenuItem>
                  </TextField>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

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
              Save
            </LoadingButton>
          ) : (
            <Button
              size="medium"
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isDirty}
              form="edit-attributes-form"
            >
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttributesForm;
