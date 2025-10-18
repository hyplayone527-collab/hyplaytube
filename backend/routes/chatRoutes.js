import express from "express";
import {
  getUserChats,
  createOrGetChat,
  getChatMessages,
  sendMessage
} from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getUserChats);
router.post("/", protect, createOrGetChat);
router.get("/:chatId", protect, getChatMessages);
router.post("/:chatId/messages", protect, sendMessage);

export default router;