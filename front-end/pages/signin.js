import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import HookFormTextField from "../components/HookFormTextField";
import { useEffect, useState } from "react";
import router from "next/router";
import { useAuthContext } from "../context/AuthContext";

const schema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email address")
    .required("Required"),
  password: yup.string("Enter your password").required("Required"),
});

const SignIn = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {
    isLoaded,
    isAuthenticated,
    isAdmin,
    setIsLoaded,
    setVerified,
    setIsAdmin,
    setIsAuthenticated,
    setUser,
    expiredMessage,
  } = useAuthContext();
  // const tap = (callback) => (value) => callback(value), value);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated && !isLoaded) router.replace("/");
  }, [isAuthenticated, isLoaded, submitting]);

  const formSubmitHandler = (formData) => {
    setSubmitting(true);

    fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setLoginError("User and password does not match");
          throw new Error(res.status);
        }
        if (res.ok) {
          setIsAuthenticated(true);
          setIsLoaded(true);
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.roles);
        setUser(data.user);
        if (data.roles === "admin") setIsAdmin(true);
        else setIsAdmin(false);
        setIsLoaded(true);
        setVerified(true);
        if (isAdmin) {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
      })
      .catch((error) => {
        console.error(err);
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
          Sign In
        </Typography>
        {expiredMessage ?? <p>{expiredMessage}</p>}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            style={{ width: "inherit" }}
          >
            <Grid item xs={12}>
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
                sx={{ marginTop: ".75rem", fontWeight: "bold" }}
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

export default SignIn;
