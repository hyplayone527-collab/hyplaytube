import Notification from "../models/Notification.js";

// Obtener notificaciones del usuario
export const getUserNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const notifications = await Notification.findUserNotifications(
      req.user._id, 
      limit
    );

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marcar notificación como leída
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    await Notification.markAsRead(notificationId);
    res.json({ message: "Notificación marcada como leída" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marcar todas las notificaciones como leídas
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const count = await Notification.markAllAsRead(req.user._id);
    res.json({ 
      message: "Todas las notificaciones marcadas como leídas",
      count 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener contador de notificaciones no leídas
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.getUnreadCount(req.user._id);
    res.json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};