import express from "express";
import {
  protectRoute,
  protectAdminRoute,
} from "../middleware/authMiddleware.js";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/songController.js";

const router = express.Router();

router.get("/", protectRoute, protectAdminRoute, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;
