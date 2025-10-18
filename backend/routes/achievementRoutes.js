import express from "express";
import {
  getUserAchievements,
  checkAchievements,
  getLeaderboard
} from "../controllers/achievementController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getUserAchievements);
router.post("/check", protect, checkAchievements);
router.get("/leaderboard", protect, getLeaderboard);

export default router;