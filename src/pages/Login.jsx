import * as React from "react";
import { Box, Paper, Snackbar, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../store/reducers/userSlice";
import { toastSuccess } from "../store/reducers/toastSlice";
import { toastClose } from "../store/reducers/toastSlice";
import { useNavigate } from "react-router";

const theme = createTheme();

export default function SignIn() {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      LOGIN({
        username: data.get("username"),
        password: data.get("password"),
      })
    )
      .then((action) => {
        if (!action.payload.error) {
          dispatch(toastSuccess("Login berhasil"));
          navigate("/dashboard");
        }
      })
      .catch(console.log);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} style={{ padding: "20px", marginTop: "80px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
                Masuk
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4 }} />
        </Paper>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => dispatch(toastClose())}
        open={toast.show}
        key="topcenter"
      >
        <Alert
          severity={toast.variant}
          sx={{ width: "100%" }}
          onClose={() => dispatch(toastClose())}
        >
          {toast.value}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
