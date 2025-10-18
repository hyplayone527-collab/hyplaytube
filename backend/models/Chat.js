import { findOne, find, create, updateOne, deleteOne, populate } from "../database/db.js";

export class Chat {
  static async findOne(query) {
    return findOne('chats', query);
  }

  static async find(query = {}) {
    return find('chats', query);
  }

  static async findById(id) {
    return findOne('chats', { _id: id });
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    return updateOne('chats', { _id: id }, update);
  }

  static async create(chatData) {
    const chat = {
      ...chatData,
      messages: chatData.messages || [],
      lastMessage: chatData.lastMessage || new Date().toISOString()
    };

    return create('chats', chat);
  }

  // Método para encontrar chats de un usuario
  static async findUserChats(userId) {
    const chats = find('chats').filter(chat => 
      chat.participants.includes(userId)
    );

    // Ordenar por último mensaje
    chats.sort((a, b) => new Date(b.lastMessage) - new Date(a.lastMessage));

    // Populate participants
    return chats.map(chat => populate(chat, [
      { path: 'participants', collection: 'users', select: 'username fullName avatar' }
    ]));
  }

  // Método para encontrar chat entre dos usuarios
  static async findChatBetweenUsers(userId1, userId2) {
    return findOne('chats', {
      participants: { $all: [userId1, userId2] }
    }) || find('chats').find(chat => 
      chat.participants.includes(userId1) && chat.participants.includes(userId2)
    );
  }

  // Método para obtener chat con populate
  static async findByIdWithPopulate(id) {
    const chat = findOne('chats', { _id: id });
    if (!chat) return null;

    return populate(chat, [
      { path: 'participants', collection: 'users', select: 'username fullName avatar' },
      { path: 'messages.sender', collection: 'users', select: 'username fullName avatar' }
    ]);
  }

  // Método para agregar mensaje
  static async addMessage(chatId, messageData) {
    const chat = findOne('chats', { _id: chatId });
    if (!chat) return null;

    const message = {
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false
    };

    chat.messages.push(message);
    chat.lastMessage = new Date().toISOString();

    return updateOne('chats', { _id: chatId }, {
      messages: chat.messages,
      lastMessage: chat.lastMessage
    });
  }
}

export default Chat;