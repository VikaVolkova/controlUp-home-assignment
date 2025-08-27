import { Pool } from "pg";

export const getAllRoles = async (db: Pool) => {
  const result = await db.query(`SELECT * FROM roles ORDER BY id`);
  return result.rows;
};
