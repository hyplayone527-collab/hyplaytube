import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);

// Socket.IO para chat en tiempo real
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("send-message", (data) => {
    socket.to(data.chatId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
