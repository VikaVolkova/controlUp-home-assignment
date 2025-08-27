import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Dropdown } from "./Dropdown";
import type { Role, User, UserRole } from "../types";

interface UserTableProps {
  users: User[];
  roles: Role[];
  onRoleChange: (userId: number, newRoles: UserRole[]) => void;
  isMobile: boolean;
  loading: boolean;
}

export const UserTable = ({
  users,
  roles,
  onRoleChange,
  isMobile,
  loading,
}: UserTableProps) => {
  const renderRolesSelector = (user: (typeof users)[0]) => (
    <Dropdown
      label="Select Roles"
      multiple
      value={user.roles}
      options={roles}
      loading={loading}
      onChange={(event) =>
        onRoleChange(user.id, event.target.value as UserRole[])
      }
    />
  );

  if (isMobile) {
    return (
      <Box>
        {users.map((user) => (
          <Paper key={user.id} sx={{ p: 2, mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography>{user.name}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Box>
            {renderRolesSelector(user)}
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "fixed", minWidth: 650, width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{renderRolesSelector(user)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
