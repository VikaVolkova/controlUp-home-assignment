export type UserRole = "Admin" | "Viewer" | "Editor";

export interface Role {
  id: number;
  name: UserRole;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
  time_created: string;
  time_updated: string;
}
