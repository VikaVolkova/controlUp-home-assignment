import type { Role, User, UserRole } from "../types";

const API_BASE_URL = "http://localhost:4000";

export async function updateUserRoles(userId: number, roles: UserRole[]) {
  const res = await fetch(`${API_BASE_URL}/users/${userId}/roles`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJpZCI6MSwicm9sZXMiOlsiQWRtaW4iXX0=",
      // Authorization: "Bearer eyJpZCI6Miwicm9sZXMiOlsiVmlld2VyIl19", -- token for user with Viewer role. Save it here to demonstrate error
    },
    body: JSON.stringify({ roles }),
  });

  if (!res.ok) {
    throw new Error("Failed to update roles");
  }
  return res.json();
}

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const getRoles = async (): Promise<Role[]> => {
  const res = await fetch(`${API_BASE_URL}/roles`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};
