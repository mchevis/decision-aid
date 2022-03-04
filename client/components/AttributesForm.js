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

const AttributesForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, dirtyFields },
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
      dirtyAttributes.map((att) =>
        axios.put(`/api/attributes/${att.id}`, {
          ...data,
        })
      )
    );

    // navigate(-1);
  };

  const watchSource = watch(["criteriaType"]);

  console.log(attributes);

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
        Edit Attributes Form
      </Typography>

      {/* FORM FIELDS */}
      <Grid container spacing={2}>
        {attributes.map((att) => (
          <Grid key={att.id} item xs={3} sx={{ width: 1 }}>
            <TextField
              required
              id={`name-${att.id}`}
              label="Name"
              defaultValue={att.name}
              helperText={
                !!errors[`name-${att.id}`] ? "This field is required" : ""
              }
              {...register(`name-${att.id}`, { required: true })}
              error={!!errors[`name-${att.id}`]}
              sx={{ width: 1 }}
            />
            <TextField
              select
              id={`priority-${att.id}`}
              label="Level of Priority"
              defaultValue={att.priority}
              helperText={
                !!errors[`priority-${att.id}`] ? "This field is required" : ""
              }
              {...register(`priority-${att.id}`, { required: true })}
              error={!!errors[`priority-${att.id}`]}
              sx={{ width: 1 }}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </TextField>
            <TextField
              select
              required
              id={`criteriaType-${att.id}`}
              label="Criteria Type"
              defaultValue={att.criteriaType}
              helperText={
                !!errors[`criteriaType-${att.id}`]
                  ? "This field is required"
                  : ""
              }
              {...register(`criteriaType-${att.id}`, { required: true })}
              error={!!errors[`criteriaType-${att.id}`]}
              sx={{ width: 1 }}
            >
              {criteriaTypePicklist?.map((criteria) => (
                <MenuItem key={criteria} value={criteria}>
                  {criteria}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id={`criteriaValue-${att.id}`}
              label="Criteria Value"
              defaultValue={att.criteriaValue || ""}
              helperText={
                !!errors[`criteriaValue-${att.id}`]
                  ? "This field is required"
                  : "Leave empty for Informational. For Min/Max: 'min' or 'max'. For boolean: 'true' or 'false'"
              }
              {...register(`criteriaValue-${att.id}`, { required: true })}
              error={!!errors[`criteriaValue-${att.id}`]}
              sx={{ width: 1 }}
            />
            <TextField
              select
              id={`isRequired-${att.id}`}
              label="Criteria MUST be met"
              defaultValue={att.isRequired}
              helperText={
                !!errors[`isRequired-${att.id}`] ? "This field is required" : ""
              }
              {...register(`isRequired-${att.id}`, { required: true })}
              error={!!errors[`isRequired-${att.id}`]}
              sx={{ width: 1 }}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
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
              disabled={isSubmitting}
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
