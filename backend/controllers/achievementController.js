import Achievement from "../models/Achievement.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Chat from "../models/Chat.js";

// Obtener logros del usuario
export const getUserAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.getUserAchievements(req.user._id);
    const points = await Achievement.getUserPoints(req.user._id);
    
    res.json({
      achievements,
      totalPoints: points,
      availableAchievements: Achievement.getAvailableAchievements()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verificar y otorgar logros
export const checkAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Calcular estadísticas del usuario
    const userPosts = await Post.find({ author: req.user._id });
    const userChats = await Chat.find({ participants: req.user._id });
    
    let totalLikes = 0;
    let messagesCount = 0;
    let hasEarlyPost = false;
    let hasLatePost = false;

    // Calcular likes totales
    userPosts.forEach(post => {
      totalLikes += post.likes.length;
      
      const postHour = new Date(post.createdAt).getHours();
      if (postHour < 6) hasEarlyPost = true;
      if (postHour >= 23) hasLatePost = true;
    });

    // Calcular mensajes enviados
    userChats.forEach(chat => {
      messagesCount += chat.messages.filter(msg => msg.sender === req.user._id).length;
    });

    const userStats = {
      postsCount: userPosts.length,
      totalLikes,
      messagesCount,
      hasEarlyPost,
      hasLatePost
    };

    const newAchievements = await Achievement.checkAndAwardAchievements(
      req.user._id, 
      userStats
    );

    res.json({
      newAchievements,
      message: newAchievements.length > 0 
        ? `¡Felicidades! Has desbloqueado ${newAchievements.length} nuevo(s) logro(s)!`
        : 'No hay nuevos logros por ahora'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener ranking de usuarios por puntos
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find();
    const leaderboard = [];

    for (const user of users) {
      const points = await Achievement.getUserPoints(user._id);
      const achievements = await Achievement.getUserAchievements(user._id);
      
      leaderboard.push({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        avatar: user.avatar,
        points,
        achievementsCount: achievements.length
      });
    }

    // Ordenar por puntos
    leaderboard.sort((a, b) => b.points - a.points);

    res.json(leaderboard.slice(0, 50)); // Top 50
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};