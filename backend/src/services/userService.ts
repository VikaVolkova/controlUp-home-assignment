import { Pool } from "pg";
import { UserRole } from "../models/role";
import { User } from "../models/user";

export const getAllUsers = async (db: Pool): Promise<User[]> => {
  const result = await db.query(`
    SELECT u.id, u.name, u.email, u.time_created, u.time_updated,
      COALESCE(json_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '[]') AS roles
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    GROUP BY u.id
    ORDER BY u.id
  `);
  return result.rows;
};

export const updateUserRoles = async (
  db: Pool,
  userId: number,
  roles: UserRole[]
) => {
  await db.query("DELETE FROM user_roles WHERE user_id = $1", [userId]);

  if (roles.length > 0) {
    const roleIds = await db.query(
      `SELECT id FROM roles WHERE name = ANY($1)`,
      [roles]
    );
    for (const row of roleIds.rows) {
      await db.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
        [userId, row.id]
      );
    }
  }

  await db.query("UPDATE users SET time_updated = NOW() WHERE id = $1", [
    userId,
  ]);
};
