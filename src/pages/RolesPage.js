import React, { useState } from "react";
import RoleTable from "../components/RoleManagement/RoleTable";
import RoleForm from "../components/RoleManagement/RoleForm";
import {
  Button,
  Container,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Stack,
  Box,
} from "@mui/material";

const RolesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const handleOpenForm = (role = null) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRole(null);
  };

  const handleSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          Role Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenForm()}
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "#1976D2",
            "&:hover": { backgroundColor: "#1565C0" },
          }}
        >
          Add New Role
        </Button>
      </Box>

      {/* Role Table Section */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fdfdfd",
          py: 3,
          px: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <RoleTable
          onEdit={(role) => handleOpenForm(role)}
          onDeleteSuccess={() =>
            handleSnackbar("Role deleted successfully!", "success")
          }
          onDeleteError={() =>
            handleSnackbar("Failed to delete role.", "error")
          }
        />
      </Paper>

      {/* Role Form Modal */}
      <RoleForm
        open={isFormOpen}
        onClose={handleCloseForm}
        selectedRole={selectedRole}
        onRefresh={() =>
          handleSnackbar("Role updated successfully!", "success")
        }
        onSubmitSuccess={() =>
          handleSnackbar("Role created successfully!", "success")
        }
        onSubmitError={() => handleSnackbar("Failed to create role.", "error")}
      />

      {/* Snackbar for Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RolesPage;
