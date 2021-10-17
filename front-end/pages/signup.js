import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import router from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../axios";
import HookFormTextField from "../components/HookFormTextField";
import { useAuthContext } from "../context/AuthContext";

const schema = yup.object({
  firstname: yup
    .string("Enter your name")
    .required("Required")
    .min(3, "At least 3 character required"),
  lastname: yup
    .string("Enter your name")
    .required("Required")
    .min(3, "At least 3 character required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email address")
    .required("Required"),
  password: yup
    .string("Enter your password")
    .min(8, "Must be at least 8 character")
    .required("Required"),
  mobile: yup
    .string("Enter your mobile number")
    .required("Required")
    .trim()
    .matches(
      /^(?:\+88|88)?(01[3-9]\d{8})$/,
      "Mobile number should be bangladeshi mobile number. Ex: 01910000000 or +8801910000000"
    ),
});

const SignUp = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { setIsLoaded } = useAuthContext();

  const formSubmitHandler = (formData) => {
    setSubmitting(true);
    console.log(formData);

    api
      .post("/user/register", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      })
      .then((res) => {
        if (res.ok) {
          setIsLoaded(true);
          router.push("/signin");
          return res.data();
        }
      })
      .then((data) => {
        console.log(data.msg);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        setLoginError(errorMessage);
      });

    setSubmitting(false);
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", width: "20rem", minWidth: "100vw" }}
      >
        <Typography
          variant="h3"
          sx={{ marginBottom: ".75rem", fontWeight: "bold", color: "#343A40" }}
        >
          Sign Up
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            style={{ width: "inherit" }}
          >
            <Grid item>
              <HookFormTextField
                label="First Name"
                name="firstname"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item>
              <HookFormTextField
                label="Last Name"
                name="lastname"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item>
              <HookFormTextField
                label="Mobile Number"
                name="mobile"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item>
              <HookFormTextField
                label="Email"
                name="email"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item>
              <HookFormTextField
                label="Password"
                name="password"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                fullWidth
                sx={{
                  marginTop: ".75rem",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Button>
            </Grid>
            {loginError && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}
          </form>
        </FormProvider>
      </Grid>
    </>
  );
};

export default SignUp;
