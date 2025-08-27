import { Router } from "express";
import { Pool } from "pg";
import * as userController from "../controllers/userController";
import { checkAdminRole } from "../middlewares/checkAdminRole";

const router = Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get("/", userController.getUsers(pool));
router.patch("/:id/roles", checkAdminRole, userController.updateRoles(pool));

export default router;
