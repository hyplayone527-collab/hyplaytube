import bcrypt from "bcryptjs";
import { findOne, find, create, updateOne, deleteOne } from "../database/db.js";

export class User {
  static async findOne(query) {
    return findOne('users', query);
  }

  static async find(query = {}) {
    return find('users', query);
  }

  static async findById(id) {
    return findOne('users', { _id: id });
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const updated = updateOne('users', { _id: id }, update);
    return updated;
  }

  static async create(userData) {
    // Hash password
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12);
    }

    // Set defaults
    const user = {
      ...userData,
      bio: userData.bio || "",
      avatar: userData.avatar || "",
      followers: userData.followers || [],
      following: userData.following || [],
      isPrivate: userData.isPrivate || false
    };

    return create('users', user);
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async findByIdAndDelete(id) {
    return deleteOne('users', { _id: id });
  }

  // Método para buscar usuarios con regex (simulado)
  static async search(query) {
    const users = find('users');
    return users.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.fullName.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
  }

  // Método para popular campos
  static populate(user, fields) {
    // Simulamos populate básico
    return user;
  }
}

export default User;