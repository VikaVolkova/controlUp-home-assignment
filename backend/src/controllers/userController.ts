import { Request, Response } from "express";
import { Pool } from "pg";
import * as userService from "../services/userService";

export const getUsers = (db: Pool) => async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers(db);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateRoles =
  (db: Pool) => async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const roles: string[] = req.body.roles || [];

    try {
      await userService.updateUserRoles(db, userId, roles);
      res.json({ message: "Roles updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update roles" });
    }
  };
