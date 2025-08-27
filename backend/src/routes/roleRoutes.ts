import { Router } from "express";
import { Pool } from "pg";
import * as roleController from "../controllers/roleController";

const router = Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get("/", roleController.getRoles(pool));

export default router;
