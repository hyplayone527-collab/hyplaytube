import { findOne, find, create, updateOne, deleteOne, populate } from "../database/db.js";

export class Post {
  static async findOne(query) {
    return findOne('posts', query);
  }

  static async find(query = {}) {
    return find('posts', query);
  }

  static async findById(id) {
    return findOne('posts', { _id: id });
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    return updateOne('posts', { _id: id }, update);
  }

  static async findByIdAndDelete(id) {
    return deleteOne('posts', { _id: id });
  }

  static async create(postData) {
    const post = {
      ...postData,
      likes: postData.likes || [],
      comments: postData.comments || [],
      shares: postData.shares || []
    };

    return create('posts', post);
  }

  // Método para obtener posts con populate
  static async findWithPopulate(query = {}, options = {}) {
    let posts = find('posts', query);
    
    // Ordenar por fecha (más recientes primero)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Paginación
    if (options.skip) {
      posts = posts.slice(options.skip);
    }
    if (options.limit) {
      posts = posts.slice(0, options.limit);
    }

    // Populate author, likes, comments.author
    return posts.map(post => populate(post, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' },
      { path: 'likes', collection: 'users', select: 'username fullName avatar' },
      { path: 'comments.author', collection: 'users', select: 'username fullName avatar' }
    ]));
  }

  // Método para obtener posts de usuarios específicos
  static async findByAuthors(authorIds, options = {}) {
    const posts = find('posts').filter(post => authorIds.includes(post.author));
    
    // Ordenar por fecha
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Paginación
    let result = posts;
    if (options.skip) {
      result = result.slice(options.skip);
    }
    if (options.limit) {
      result = result.slice(0, options.limit);
    }

    // Populate
    return result.map(post => populate(post, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' },
      { path: 'likes', collection: 'users', select: 'username fullName avatar' },
      { path: 'comments.author', collection: 'users', select: 'username fullName avatar' }
    ]));
  }
}

export default Post;