import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import UsersTable from "../components/UserManagement/UserTable";
import UserFormDialog from "../components/UserManagement/UsersFormDialog";
import { getUsers, deleteUser, addUser, updateUser } from "../services/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      showSnackbar("Failed to fetch users.", "error");
    }
  };

  const handleOpenForm = (user = null) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData);
        showSnackbar("User updated successfully!", "success");
      } else {
        await addUser(formData);
        showSnackbar("User added successfully!", "success");
      }
      handleCloseForm();
      fetchUsers();
    } catch (error) {
      showSnackbar("Operation failed.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      showSnackbar("User deleted successfully!", "success");
      fetchUsers();
    } catch (error) {
      showSnackbar("Failed to delete user.", "error");
    }
  };

  const showSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
  };

  return (
    <Container>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpenForm()}
      >
        Add User
      </Button>
      <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <UsersTable
          users={users}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
        />
      </Paper>
      <UserFormDialog
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        user={selectedUser}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default UsersPage;
