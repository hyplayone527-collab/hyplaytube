import express from "express";
import {
  createStory,
  getActiveStories,
  viewStory,
  getUserStories,
  deleteStory
} from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createStory);
router.get("/", protect, getActiveStories);
router.post("/:storyId/view", protect, viewStory);
router.get("/user/:username", protect, getUserStories);
router.delete("/:storyId", protect, deleteStory);

export default router;