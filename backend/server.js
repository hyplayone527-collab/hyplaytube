import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";
import cron from "node-cron";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";

import Story from "./models/Story.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware de seguridad y optimización
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: 'Demasiadas peticiones, intenta de nuevo más tarde'
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'NovaStream Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/achievements", achievementRoutes);

// Socket.IO para funcionalidades en tiempo real
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Unirse a sala de usuario para notificaciones
  socket.on("join-user", (userId) => {
    socket.join(`user_${userId}`);
  });

  // Chat en tiempo real
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("send-message", (data) => {
    socket.to(data.chatId).emit("receive-message", data);
  });

  // Notificaciones en tiempo real
  socket.on("send-notification", (data) => {
    socket.to(`user_${data.recipientId}`).emit("new-notification", data);
  });

  // Likes en tiempo real
  socket.on("post-liked", (data) => {
    socket.broadcast.emit("post-update", data);
  });

  // Nuevas historias
  socket.on("new-story", (data) => {
    socket.broadcast.emit("story-update", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Tareas programadas
// Limpiar historias expiradas cada hora
cron.schedule('0 * * * *', async () => {
  try {
    const deletedCount = await Story.deleteExpiredStories();
    console.log(`Historias expiradas eliminadas: ${deletedCount}`);
  } catch (error) {
    console.error('Error limpiando historias:', error);
  }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
