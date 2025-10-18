import express from "express";
import {
  createPost,
  getFeed,
  getUserPosts,
  likePost,
  commentPost,
  deletePost
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);
router.get("/user/:username", protect, getUserPosts);
router.post("/:postId/like", protect, likePost);
router.post("/:postId/comment", protect, commentPost);
router.delete("/:postId", protect, deletePost);

export default router;