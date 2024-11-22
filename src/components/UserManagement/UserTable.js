import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserTable = ({ onEdit, showActions = true, showStatus = true }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ py: 4 }}
        >
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ py: 4 }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No users available.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adding some users to see them here.
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Role
              </TableCell>
              {showStatus && (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
              )}
              {showActions && (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                {showStatus && (
                  <TableCell align="center">{user.status}</TableCell>
                )}
                {showActions && (
                  <TableCell align="center">
                    <Tooltip title="Edit User">
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(user)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserTable;
