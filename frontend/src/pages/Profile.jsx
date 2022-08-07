import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from "@mui/material";
import axios from "axios";
import HistoryBtn from "./components/HistoryBtn";
import CustAlert from "./components/Alert";
import Copyright from "./components/CopyRight";
import emailValidation from "../utils/emailValidation";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState({
    _id: user._id,
    userFirstName: "",
    userLastName: "",
    userGender: "",
    userAge: 0,
    userAddress: "",
    userEmail: "",
    userPassword: "",
  });
  const [alert, setAlert] = useState({ show: false, type: "error", msg: "" });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user._id) {
      try {
        axios
          .get(`http://localhost:5000/profile?id=${user._id}`)
          .then((res) => {
            const data = res.data;
            setUserInfo({
              _id: data._id,
              userFirstName: data.userFirstName,
              userLastName: data.userLastName,
              userGender: data.userGender,
              userAge: data.userAge,
              userAddress: data.userAddress,
              userEmail: data.userEmail,
              userPassword: data.userPassword,
            });
          });
      } catch (err) {
        setAlert({ show: true, type: "error", msg: err });
      }
    }
  }, []);

  const handleSubmit = (event) => {
    if (!emailValidation(userInfo.userEmail)) {
      setAlert({ show: true, type: "error", msg: "invalid email format" });
    }
    try {
      axios.post("http://localhost:5000/profile", userInfo).then((res) => {
        if (res.data.result ?? false === true) {
          setAlert({ show: true, type: "success", msg: "update success!" });
        } else {
          setAlert({ show: true, type: "error", msg: res.data.errors.msg });
        }
      });
    } catch (err) {
      setAlert({ show: true, type: "error", msg: err });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const closeAlert = () => {
    setAlert({ show: false, type: "error", msg: "" });
  };
  const handleLogout = () => {
    sessionStorage.clear("user");
    navigate("/login");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={"span"}
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Profile
          </Typography>
          <HistoryBtn color="inherit" setAlert={setAlert}>
            History
          </HistoryBtn>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <CustAlert
        open={alert.show}
        type={alert.type}
        text={alert.msg}
        callback={() => closeAlert(false)}
      />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <React.Fragment>
            <Typography variant="h5" gutterBottom component={"span"}>
              Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="userFirstName"
                  label="First name"
                  value={userInfo.userFirstName ?? ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="userLastName"
                  label="Last name"
                  value={userInfo.userLastName ?? ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="gender"
                  name="userGender"
                  label="Gender"
                  value={userInfo.userGender ?? ""}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="age"
                  name="userAge"
                  label="Age"
                  value={userInfo.userAge ?? 0}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="userAddress"
                  label="Address"
                  value={userInfo.userAddress ?? ""}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="userEmail"
                  label="Email"
                  value={userInfo.userEmail ?? ""}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="userPassword"
                  label="Password"
                  value={userInfo.userPassword ?? ""}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={handleSubmit}
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
