import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateProfile, 
  followUser, 
  unfollowUser, 
  searchUsers 
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:username", protect, getUserProfile);
router.put("/profile", protect, updateProfile);
router.post("/follow/:userId", protect, followUser);
router.post("/unfollow/:userId", protect, unfollowUser);
router.get("/search", protect, searchUsers);

export default router;
