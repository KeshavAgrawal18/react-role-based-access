import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const PermissionEditor = ({ permissions, onChange }) => {
  const permissionsList = ["read", "write", "delete"];

  const handleTogglePermission = (permission) => {
    const updatedPermissions = permissions.includes(permission)
      ? permissions.filter((perm) => perm !== permission)
      : [...permissions, permission];
    onChange(updatedPermissions);
  };

  return (
    <div>
      {permissionsList.map((permission) => (
        <FormControlLabel
          key={permission}
          control={
            <Checkbox
              checked={permissions.includes(permission)}
              onChange={() => handleTogglePermission(permission)}
            />
          }
          label={permission}
        />
      ))}
    </div>
  );
};

export default PermissionEditor;
