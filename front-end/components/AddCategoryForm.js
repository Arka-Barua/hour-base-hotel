import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Chip,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Dropzone from "./Dropzone";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import api from "../axios";
import { mutate } from "swr";

const FCWidth = {
  width: "40rem",
  maxWidth: "40rem",
  marginBottom: 2,
};

const schema = yup.object({
  name: yup.string("Enter the category name").required("Required"),
  maxPeople: yup.string("Choose Max People").required("Required"),
  price_per_hour: yup.string("Enter price").required("Required"),
  services: yup.array().min(1),
  images: yup
    .mixed()
    .test("name", "At least 3 File is required", (value) => {
      const imgArray = Array.from(value);
      return imgArray && imgArray.length >= 3;
    })
    // .test("fileSize", "The file is too large", (value) => {
    //   return value[0] && value[0].size <= 1000000;
    // })
    .test("type", "We only support image", (value) => {
      const imgArray = Array.from(value);
      imgArray && console.log(imgArray);
      imgArray.map((img) => {
        console.log(img.type);
        if (img.type === "image/png" || "image/jpg" || "image/jpeg") return img;
      });
    }),
});

const AddCategoryForm = ({ setOpenPopup }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      maxPeople: "",
      price_per_hour: "",
      services: [],
      images: [],
    },
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formSubmitHandler = (data) => {
    setSubmitting(true);
    console.log(data);
    const serviceList = data.services;
    const imageArray = Array.from(data.images);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("maxPeople", data.maxPeople);
    formData.append("price_per_hour", data.price_per_hour);
    formData.append("", data.price_per_hour);
    serviceList.map((service) => formData.append("services", service));
    imageArray.map((image) => formData.append("images", image));

    api
      .post("/category/create", formData)
      .then((res) => {
        if (res.statusText === "Created") {
          mutate("/category");
          setOpenPopup(false);
        }

        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setSubmitError(error.response.data.message);
        }
      });

    setSubmitting(false);
  };

  const services = [
    "Free Wifi",
    "Air Condition",
    "Pet service",
    "Meal services",
  ];

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 4,
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <TextField
                  {...field}
                  name="name"
                  type="text"
                  label="Name"
                  variant="outlined"
                />
                <FormHelperText error={true}>
                  {errors.name?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
        <Controller
          control={control}
          name="maxPeople"
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <InputLabel id="maxPeople">Max People</InputLabel>
                <Select
                  {...field}
                  labelId="maxPeople"
                  label="Max People"
                  name="maxPeople"
                  type="text"
                >
                  <MenuItem value="1">One</MenuItem>
                  <MenuItem value="2">Two</MenuItem>
                  <MenuItem value="3">Three</MenuItem>
                  <MenuItem value="4">Four</MenuItem>
                </Select>
                <FormHelperText error={true}>
                  {errors.maxPeople?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
        <Controller
          control={control}
          name="services"
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <InputLabel id="services">Services</InputLabel>
                <Select
                  {...field}
                  name="services"
                  labelId="services"
                  label="Services"
                  multiple
                  defaultValue={[]}
                  type="text"
                  input={<OutlinedInput label="Sevices" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {services.map((service) => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={true}>
                  {errors.services?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
        <Controller
          name="price_per_hour"
          control={control}
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <TextField
                  {...field}
                  name="price_per_hour"
                  type="text"
                  label="Price Per Hour"
                  type="text"
                  variant="outlined"
                />
                <FormHelperText error={true}>
                  {errors.price_per_hour?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <FormHelperText variant="filled" sx={{ marginBottom: 2 }}>
                  <strong>
                    At least 3 images should be selected. Only image file
                    (.jpeg, .jpg, .png) allowed.
                  </strong>
                </FormHelperText>
                <Dropzone onChange={(e) => field.onChange(e.target.files)} />
                <FormHelperText error={true}>
                  {errors.images?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
        {submitError && <strong style={{ color: "red" }}>{submitError}</strong>}
        <Grid item xs={12} md={12}>
          <FormControl sx={FCWidth}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              fullWidth
              sx={{ marginTop: ".75rem", fontWeight: "bold" }}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCategoryForm;
