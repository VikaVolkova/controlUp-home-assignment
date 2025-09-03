import { useEffect, useState } from "react";
import type { User, Role, UserRole } from "../types";
import * as api from "../api/service";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const [usersData, rolesData] = await Promise.all([
        api.getUsers(),
        api.getRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (err) {
      setError(
        "Failed to fetch data from the server. " + (err as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUserRoles = async (
    userId: number,
    newRoles: UserRole[]
  ) => {
    const updatedRoles: UserRole[] =
      newRoles.length > 0 ? newRoles : ["Viewer"];

    try {
      await api.updateUserRoles(userId, updatedRoles);
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, roles: updatedRoles } : user
        )
      );
    } catch {
      setError("Failed to update user roles. Reverting changes.");
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, roles: ["Viewer"] } : user
        )
      );
    }
  };

  return {
    users,
    roles,
    loading,
    error,
    fetchData,
    handleUpdateUserRoles,
  };
};
