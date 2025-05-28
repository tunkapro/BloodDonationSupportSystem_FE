import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitPhoneLogin = async (data) => {
    console.log("Phone login data:", data);
    // Call your Spring Boot API with data.phone & data.password
    try {
      const response = await axios.post("http://localhost:8080/api/auth/phone", data);
      console.log("Phone login response:", response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const response = await axios.post("http://localhost:8080/api/auth/google", {
        idToken,
      });
      console.log("Google login response:", response.data);
    } catch (error) {
      console.error("Google login failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit(onSubmitPhoneLogin)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Phone Number"
              fullWidth
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Box textAlign="center">
          <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={() => console.log("Google login error")} />
        </Box>
      </Paper>
    </Box>
  );
}
