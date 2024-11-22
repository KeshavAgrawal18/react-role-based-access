import React, { useState } from "react";
import { addUser, updateUser } from "../../services/api";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const UserForm = ({ open, onClose, selectedUser, onRefresh }) => {
  const [formData, setFormData] = useState(
    selectedUser || { name: "", email: "", role: "", status: "Active" }
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.role) newErrors.role = "Role is required.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (selectedUser) {
      await updateUser(selectedUser.id, formData);
    } else {
      await addUser(formData);
    }

    setErrors({});
    onClose();
    onRefresh();
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          backgroundColor: "#007BFF",
          color: "#fff",
          padding: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {selectedUser ? "Edit User" : "Add User"}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ color: "#555", marginBottom: 2 }}>
          {selectedUser
            ? "Update the details of the user below."
            : "Fill out the form to add a new user."}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Role"
              fullWidth
              variant="outlined"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              error={!!errors.role}
              helperText={errors.role}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Status"
              select
              fullWidth
              variant="outlined"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: "capitalize",
            fontWeight: "500",
            color: "#555",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
