import { findOne, find, create, updateOne } from "../database/db.js";

export class Achievement {
  static async findOne(query) {
    return findOne('achievements', query);
  }

  static async find(query = {}) {
    return find('achievements', query);
  }

  static async create(achievementData) {
    return create('achievements', achievementData);
  }

  // Logros predefinidos
  static getAvailableAchievements() {
    return [
      {
        id: 'first_post',
        name: 'Primera Publicación',
        description: 'Crea tu primera publicación',
        icon: '📝',
        points: 10,
        condition: (user, stats) => stats.postsCount >= 1
      },
      {
        id: 'social_butterfly',
        name: 'Mariposa Social',
        description: 'Sigue a 10 usuarios',
        icon: '🦋',
        points: 25,
        condition: (user, stats) => user.following.length >= 10
      },
      {
        id: 'popular',
        name: 'Popular',
        description: 'Consigue 50 seguidores',
        icon: '⭐',
        points: 50,
        condition: (user, stats) => user.followers.length >= 50
      },
      {
        id: 'content_creator',
        name: 'Creador de Contenido',
        description: 'Publica 25 posts',
        icon: '🎨',
        points: 75,
        condition: (user, stats) => stats.postsCount >= 25
      },
      {
        id: 'influencer',
        name: 'Influencer',
        description: 'Consigue 1000 likes en total',
        icon: '💎',
        points: 100,
        condition: (user, stats) => stats.totalLikes >= 1000
      },
      {
        id: 'chat_master',
        name: 'Maestro del Chat',
        description: 'Envía 100 mensajes',
        icon: '💬',
        points: 30,
        condition: (user, stats) => stats.messagesCount >= 100
      },
      {
        id: 'early_bird',
        name: 'Madrugador',
        description: 'Publica antes de las 6 AM',
        icon: '🌅',
        points: 15,
        condition: (user, stats) => stats.hasEarlyPost
      },
      {
        id: 'night_owl',
        name: 'Búho Nocturno',
        description: 'Publica después de las 11 PM',
        icon: '🦉',
        points: 15,
        condition: (user, stats) => stats.hasLatePost
      }
    ];
  }

  static async checkAndAwardAchievements(userId, userStats) {
    const user = findOne('users', { _id: userId });
    const userAchievements = find('achievements', { userId });
    const earnedAchievementIds = userAchievements.map(a => a.achievementId);
    
    const availableAchievements = this.getAvailableAchievements();
    const newAchievements = [];

    for (const achievement of availableAchievements) {
      if (!earnedAchievementIds.includes(achievement.id)) {
        if (achievement.condition(user, userStats)) {
          const newAchievement = await this.create({
            userId,
            achievementId: achievement.id,
            name: achievement.name,
            description: achievement.description,
            icon: achievement.icon,
            points: achievement.points,
            earnedAt: new Date().toISOString()
          });
          newAchievements.push(newAchievement);
        }
      }
    }

    return newAchievements;
  }

  static async getUserAchievements(userId) {
    return find('achievements', { userId });
  }

  static async getUserPoints(userId) {
    const achievements = find('achievements', { userId });
    return achievements.reduce((total, achievement) => total + achievement.points, 0);
  }
}

export default Achievement;