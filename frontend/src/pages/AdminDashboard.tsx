import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useUsers } from "../hooks/useUsers";
import { UserTable } from "../components/UserTable";
import { Dropdown } from "../components/Dropdown";
import type { UserRole } from "../types";

export const AdminDashboard = () => {
  const { users, roles, loading, error, handleUpdateUserRoles } = useUsers();
  const [filterRole, setFilterRole] = useState<UserRole | "All">("All");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const filteredUsers =
    filterRole === "All"
      ? users
      : users.filter((user) => user.roles.includes(filterRole));

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          User Management
        </Typography>

        <Dropdown
          label="Filter by Role"
          multiple={false}
          value={filterRole}
          options={[
            { id: -1, name: "All" },
            { id: 0, name: "Viewer" },
            { id: 1, name: "Admin" },
            { id: 2, name: "Editor" },
          ]}
          loading={loading}
          onChange={(e) => setFilterRole(e.target.value as UserRole)}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {filteredUsers.length === 0 && !loading && (
        <Typography sx={{ mb: 2 }}>
          No users found. Please check your filters.
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <UserTable
          users={filteredUsers}
          roles={roles}
          onRoleChange={handleUpdateUserRoles}
          isMobile={isMobile}
          loading={loading}
        />
      )}
    </Box>
  );
};
