import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper
} from "@mui/material";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Low", "Medium", "High", "Critical"];

export default function EmergencyBloodRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // You can send this data to your API
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
    >
        <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Emergency Blood Request Form
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Registered by Staff"
            fullWidth
            {...register("registered_by_staff", { required: "Required" })}
            error={!!errors.registered_by_staff}
            helperText={errors.registered_by_staff?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Patient Name"
            fullWidth
            {...register("patient_name", { required: "Required" })}
            error={!!errors.patient_name}
            helperText={errors.patient_name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            {...register("phonenumber", {
              required: "Required",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Invalid phone number",
              },
            })}
            error={!!errors.phonenumber}
            helperText={errors.phonenumber?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            {...register("address", { required: "Required" })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Blood Type"
            select
            fullWidth
            {...register("blood_type", { required: "Required" })}
            error={!!errors.blood_type}
            helperText={errors.blood_type?.message}
          >
            {bloodTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Unit"
            type="number"
            fullWidth
            {...register("unit", {
              required: "Required",
              min: { value: 1, message: "Minimum 1 unit" },
            })}
            error={!!errors.unit}
            helperText={errors.unit?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Level of Urgency"
            select
            fullWidth
            {...register("level_of_urgency", { required: "Required" })}
            error={!!errors.level_of_urgency}
            helperText={errors.level_of_urgency?.message}
          >
            {urgencyLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Hospital Address"
            fullWidth
            {...register("address_hospital", { required: "Required" })}
            error={!!errors.address_hospital}
            helperText={errors.address_hospital?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Note"
            multiline
            rows={3}
            fullWidth
            {...register("note")}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            Submit Request
          </Button>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  );
}
