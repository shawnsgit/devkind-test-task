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

export default function SignIn() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, type: "error", msg: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");

    if (!emailValidation(userEmail)) {
      setAlert({ show: true, type: "error", msg: "invalid email format" });
    }

    const userInfo = {
      userEmail,
      userPassword,
    };

    try {
      axios.post("http://localhost:5000/login", userInfo).then((res) => {
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
