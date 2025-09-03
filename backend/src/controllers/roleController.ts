import { Request, Response } from "express";
import { Pool } from "pg";
import * as roleService from "../services/roleService";
import { Role } from "../models/role";

export const getRoles = (db: Pool) => async (req: Request, res: Response) => {
  try {
    const roles: Role[] = await roleService.getAllRoles(db);
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};
