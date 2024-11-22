import React, { useEffect, useState } from "react";
import { getRoles, deleteRole } from "../../services/api";
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

const RoleTable = ({ onEdit }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await deleteRole(id);
      fetchRoles();
    }
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ py: 4 }}
        >
          <CircularProgress />
        </Box>
      ) : roles.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ py: 4 }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No roles available.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add roles to see them here.
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
                Role Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Permissions
              </TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow
                key={role.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <TableCell align="center">{role.name}</TableCell>
                <TableCell align="center">
                  {role.permissions.length > 0
                    ? role.permissions.join(", ")
                    : "No permissions"}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Role">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(role)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Role">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(role.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default RoleTable;
