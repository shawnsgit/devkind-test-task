import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustAlert from "./components/Alert";
import Copyright from "./components/CopyRight";
import emailValidation from "../utils/emailValidation";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, type: "error", msg: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    const userFirstName = data.get("firstName");
    const userLastName = data.get("lastName");
    const userAge = data.get("age");
    const userGender = data.get("gender");

    if (!emailValidation(userEmail)) {
      setAlert({ show: true, type: "error", msg: "invalid email format" });
    }

    const userInfo = {
      userEmail,
      userPassword,
      userFirstName,
      userLastName,
      userAge,
      userGender,
    };

    try {
      axios.post("http://localhost:5000/signup", userInfo).then((res) => {
        if (res.data.result ?? false === true) {
          sessionStorage.setItem("user", JSON.stringify(res.data));
          navigate("/profile");
        } else {
          setAlert({ show: true, type: "error", msg: res.data.errors.msg });
        }
      });
    } catch (err) {
      setAlert({ show: true, type: "error", msg: err });
    }
  };
  const closeAlert = () => {
    setAlert({ show: false, type: "error", msg: "" });
  };
  return (
    <ThemeProvider theme={theme}>
      <CustAlert
        open={alert.show}
        type={alert.type}
        text={alert.msg}
        callback={() => closeAlert(false)}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={18} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={18} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={18} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={18} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
