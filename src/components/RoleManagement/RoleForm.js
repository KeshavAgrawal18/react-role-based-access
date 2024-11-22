import React, { useState } from "react";
import { addRole, updateRole } from "../../services/api";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const RoleForm = ({ open, onClose, selectedRole, onRefresh }) => {
  const [formData, setFormData] = useState(
    selectedRole || { name: "", permissions: [] }
  );

  const permissionsList = ["read", "write", "delete"];

  const handleTogglePermission = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((perm) => perm !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = async () => {
    if (selectedRole) {
      await updateRole(selectedRole.id, formData);
    } else {
      await addRole(formData);
    }
    onClose();
    onRefresh();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedRole ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
        />
        <div>
          {permissionsList.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                />
              }
              label={permission}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleForm;
