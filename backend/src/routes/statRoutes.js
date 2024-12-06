import express from "express";
import { getStats } from "../controllers/statController.js";
import {
  protectRoute,
  protectAdminRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, protectAdminRoute, getStats);

export default router;
