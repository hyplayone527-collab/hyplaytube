import { findOne, find, create, updateOne, deleteOne, populate } from "../database/db.js";

export class Notification {
  static async findOne(query) {
    return findOne('notifications', query);
  }

  static async find(query = {}) {
    return find('notifications', query);
  }

  static async create(notificationData) {
    const notification = {
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString()
    };

    return create('notifications', notification);
  }

  static async findUserNotifications(userId, limit = 20) {
    const notifications = find('notifications', { recipient: userId })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);

    return notifications.map(notification => populate(notification, [
      { path: 'sender', collection: 'users', select: 'username fullName avatar' },
      { path: 'post', collection: 'posts', select: 'content' }
    ]));
  }

  static async markAsRead(notificationId) {
    return updateOne('notifications', { _id: notificationId }, { read: true });
  }

  static async markAllAsRead(userId) {
    const userNotifications = find('notifications', { recipient: userId });
    userNotifications.forEach(notification => {
      if (!notification.read) {
        updateOne('notifications', { _id: notification._id }, { read: true });
      }
    });
    return userNotifications.length;
  }

  static async getUnreadCount(userId) {
    return find('notifications', { recipient: userId, read: false }).length;
  }

  // Tipos de notificaciones
  static async createLikeNotification(postId, likerId, postAuthorId) {
    if (likerId === postAuthorId) return; // No notificar si es el mismo usuario

    return this.create({
      type: 'like',
      sender: likerId,
      recipient: postAuthorId,
      post: postId,
      message: 'le gustó tu publicación'
    });
  }

  static async createCommentNotification(postId, commenterId, postAuthorId) {
    if (commenterId === postAuthorId) return;

    return this.create({
      type: 'comment',
      sender: commenterId,
      recipient: postAuthorId,
      post: postId,
      message: 'comentó tu publicación'
    });
  }

  static async createFollowNotification(followerId, followedId) {
    return this.create({
      type: 'follow',
      sender: followerId,
      recipient: followedId,
      message: 'comenzó a seguirte'
    });
  }
}

export default Notification;