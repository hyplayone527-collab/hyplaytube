import express from "express";
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCount
} from "../controllers/notificationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getUserNotifications);
router.get("/unread-count", protect, getUnreadCount);
router.put("/:notificationId/read", protect, markNotificationAsRead);
router.put("/mark-all-read", protect, markAllNotificationsAsRead);

export default router;