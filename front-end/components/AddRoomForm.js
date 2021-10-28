import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../axios";
import useSWR, { mutate } from "swr";

const fetcher = (url) => api.get(url).then((res) => res.data);

const FCWidth = {
  width: "40rem",
  maxWidth: "40rem",
  marginBottom: 2,
};

const schema = yup.object({
  roomNumber: yup.string("Enter room number").required("Required"),
  category: yup.string("Choose category").required("Required"),
});

const AddRoomForm = ({ setOpenPopup }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomNumber: "",
      category: "",
    },
    resolver: yupResolver(schema),
  });
  const { data: categories } = useSWR("/category", fetcher);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  //   const categories = data;

  const formSubmitHandler = (data) => {
    setSubmitting(true);
    console.log(data);

    api
      .post("/room/create", {
        roomNumber: data.roomNumber,
        category: data.category,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          mutate("/room");
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
          control={control}
          name="roomNumber"
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <TextField
                  {...field}
                  name="roomNumber"
                  type="text"
                  label="Room number"
                  variant="outlined"
                />
                <FormHelperText error={true}>
                  {errors.roomNumber?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Grid item xs={12} md={12}>
              <FormControl sx={FCWidth}>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  {...field}
                  labelId="category"
                  label="Category"
                  name="category"
                  type="text"
                >
                  {categories &&
                    categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={true}>
                  {errors.category?.message}
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

export default AddRoomForm;
