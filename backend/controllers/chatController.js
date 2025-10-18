import Chat from "../models/Chat.js";
import User from "../models/User.js";

// Obtener chats del usuario
export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.findUserChats(req.user._id);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear o obtener chat
export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body;

    // Verificar que el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar chat existente
    let chat = await Chat.findChatBetweenUsers(req.user._id, userId);

    // Si no existe, crear uno nuevo
    if (!chat) {
      chat = await Chat.create({
        participants: [req.user._id, userId],
        messages: []
      });
    }
    
    // Obtener chat con populate
    const populatedChat = await Chat.findByIdWithPopulate(chat._id);

    res.json(populatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener mensajes de un chat
export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const chat = await Chat.findByIdWithPopulate(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    // Verificar que el usuario es participante del chat
    if (!chat.participants.some(p => p._id === req.user._id)) {
      return res.status(403).json({ message: "No autorizado" });
    }

    // Paginar mensajes (los más recientes primero)
    const startIndex = Math.max(0, chat.messages.length - (page * limit));
    const endIndex = chat.messages.length - ((page - 1) * limit);
    
    const messages = chat.messages.slice(startIndex, endIndex).reverse();

    res.json({
      ...chat,
      messages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enviar mensaje
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    // Verificar que el usuario es participante del chat
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const message = {
      sender: req.user._id,
      content
    };

    await Chat.addMessage(chatId, message);

    // Obtener el usuario que envía el mensaje
    const sender = await User.findById(req.user._id);
    const messageWithSender = {
      ...message,
      sender: {
        _id: sender._id,
        username: sender.username,
        fullName: sender.fullName,
        avatar: sender.avatar
      },
      timestamp: new Date().toISOString()
    };

    res.json(messageWithSender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};