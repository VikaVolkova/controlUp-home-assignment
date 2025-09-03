export type UserRole = "Admin" | "Viewer" | "Editor";

export interface Role {
  id: number;
  name: UserRole;
}
