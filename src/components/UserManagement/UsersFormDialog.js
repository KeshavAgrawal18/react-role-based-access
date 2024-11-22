import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const UserFormDialog = ({ open, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, role: user.role });
    } else {
      setFormData({ name: "", email: "", role: "" });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Role"
          fullWidth
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
