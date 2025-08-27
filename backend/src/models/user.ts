export interface User {
  id: number;
  name: string;
  email: string;
  time_created: string;
  time_updated: string;
}

export interface UserWithRoles extends User {
  roles: string[];
}
