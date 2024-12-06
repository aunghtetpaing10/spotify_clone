import express from "express";
import { getStats } from "../controllers/statController.js";
import {
  protectRoute,
  portectAdminRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, portectAdminRoute, getStats);

export default router;
