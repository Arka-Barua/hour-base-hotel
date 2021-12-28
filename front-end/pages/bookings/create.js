import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import UserLayout from "../../components/UserLayout";
import withAuth from "../../HOC/withAuth";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import useSWR from "swr";
import api from "../../axios";
import { differenceInHours } from "date-fns";
import router from "next/router";

const fetcher = (url) => api.get(url).then((res) => res.data);

const schema = yup.object({
  checkIn: yup.date().required("required").nullable(),
  checkOut: yup
    .date()
    .required("required")
    .min(yup.ref("checkIn"), "CheckOut date can't be before CheckIn date")
    .nullable(),
  noOfPeople: yup.string("Enter no. of people").required("required"),
  category: yup.string("Enter room type").required("Required"),
});

const FCWidth = {
  width: "40rem",
  maxWidth: "40rem",
  marginBottom: 2,
};

const MakeBookings = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      noOfPeople: "",
      checkIn: null,
      checkOut: null,
    },
    resolver: yupResolver(schema),
  });
  const { data: categories } = useSWR("/category", fetcher);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formSubmitHandler = (data) => {
    setSubmitting(true);
    data.checkIn.setSeconds(0);
    data.checkOut.setSeconds(0);
    console.log(data);
    const totalHours = differenceInHours(
      new Date(data.checkOut),
      new Date(data.checkIn)
    );
    console.log(totalHours);
    const selectedCategory = categories.find((item) => {
      if (item.id === data.category) return item;
    });
    // console.log(priceOfCategory);
    const totalPrice = totalHours * selectedCategory.price_per_hour;
    console.log(totalPrice);
    api
      .post("/booking/create", {
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        noOfPeople: data.noOfPeople,
        category: data.category,
        stayDuration: totalHours,
        totalPrice,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status < 300) {
          router.push("/bookings");
        }
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
    <UserLayout>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <Grid
              container
              spacing={0}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                marginTop: 8,
                minWidth: "100%",
                minHeight: "100%",
              }}
            >
              <Controller
                name="checkIn"
                control={control}
                render={({ field }) => (
                  <Grid item xs={12} md={12}>
                    <FormControl sx={FCWidth}>
                      <DateTimePicker
                        {...field}
                        label="Check In"
                        name="checkIn"
                        disablePast={true}
                        minutesStep={60}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <FormHelperText error={true}>
                        {errors.checkIn?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}
              />
              <Controller
                name="checkOut"
                control={control}
                render={({ field }) => (
                  <Grid item xs={12} md={12}>
                    <FormControl sx={FCWidth}>
                      <DateTimePicker
                        {...field}
                        label="Check Out"
                        name="checkOut"
                        disablePast={true}
                        minutesStep={60}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <FormHelperText error={true}>
                        {errors.checkOut?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}
              />
              <Controller
                name="noOfPeople"
                control={control}
                render={({ field }) => (
                  <Grid item xs={12} md={12}>
                    <FormControl sx={FCWidth}>
                      <TextField
                        {...field}
                        name="noOfPeople"
                        type="text"
                        label="No. of People"
                        variant="outlined"
                      />
                      <FormHelperText error={true}>
                        {errors.noOfPeople?.message}
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
              {submitError && (
                <strong style={{ color: "red" }}>{submitError}</strong>
              )}
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
        </LocalizationProvider>
      </Container>
    </UserLayout>
  );
};

export default withAuth(MakeBookings);
