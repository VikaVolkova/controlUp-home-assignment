import { Pool } from "pg";
import { Role } from "../models/role";

export const getAllRoles = async (db: Pool): Promise<Role[]> => {
  const result = await db.query(`SELECT * FROM roles ORDER BY id`);
  return result.rows;
};
