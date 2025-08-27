// import { useState } from "react";
// import { useUsers } from "../hooks/useUsers";
// import {
//   Box,
//   CircularProgress,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Dropdown } from "./Dropdown";
// import type { UserRole } from "../types";

// export const UserTable = () => {
//   const { users, roles, loading, error, handleUpdateUserRoles } = useUsers();
//   const [filterRole, setFilterRole] = useState<UserRole | "All">("All");

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const handleRoleChange = (userId: number, newRoles: UserRole[]) => {
//     handleUpdateUserRoles(userId, newRoles);
//   };

//   const filteredUsers =
//     filterRole === "All"
//       ? users
//       : users.filter((user) => user.roles.includes(filterRole));

//   const renderRolesSelector = (user: (typeof users)[0]) => (
//     <Dropdown
//       label="Select Roles"
//       multiple
//       value={user.roles}
//       options={roles}
//       loading={loading}
//       onChange={(event) =>
//         handleRoleChange(user.id, event.target.value as UserRole[])
//       }
//     />
//   );

//   const renderDesktopView = () => (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell sx={{ width: "40%" }}>Roles</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredUsers.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{renderRolesSelector(user)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   const renderMobileView = () => (
//     <Box>
//       {filteredUsers.map((user) => (
//         <Paper key={user.id} sx={{ p: 2, mb: 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Name
//             </Typography>
//             <Typography>{user.name}</Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Email
//             </Typography>
//             <Typography variant="body2">{user.email}</Typography>
//           </Box>
//           {renderRolesSelector(user)}
//         </Paper>
//       ))}
//     </Box>
//   );

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       <Typography variant="h4" gutterBottom>
//         User Management
//       </Typography>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       <Dropdown
//         label="Filter by Role"
//         multiple={false}
//         value={filterRole === "All" ? "" : filterRole}
//         options={[
//           { id: -1, name: "All" },
//           { id: 0, name: "Viewer" },
//           { id: 1, name: "Admin" },
//           { id: 2, name: "Editor" },
//         ]}
//         loading={loading}
//         onChange={(e) => setFilterRole(e.target.value as UserRole)}
//       />
//       {filteredUsers.length == 0 && (
//         <Typography sx={{ mb: 2 }}>
//           No users found. Please check your filters
//         </Typography>
//       )}

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : isMobile ? (
//         renderMobileView()
//       ) : (
//         renderDesktopView()
//       )}
//     </Box>
//   );
// };

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
