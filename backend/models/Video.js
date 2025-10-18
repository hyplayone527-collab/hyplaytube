import { findOne, find, create, updateOne, deleteOne, populate } from "../database/db.js";

export class Video {
  static async findOne(query) {
    return findOne('videos', query);
  }

  static async find(query = {}) {
    return find('videos', query);
  }

  static async findById(id) {
    return findOne('videos', { _id: id });
  }

  static async create(videoData) {
    const video = {
      ...videoData,
      views: videoData.views || 0,
      likes: videoData.likes || [],
      dislikes: videoData.dislikes || [],
      comments: videoData.comments || [],
      tags: videoData.tags || [],
      category: videoData.category || 'General',
      duration: videoData.duration || 0,
      quality: videoData.quality || '720p',
      isLive: videoData.isLive || false,
      isPublic: videoData.isPublic !== false, // Por defecto público
      monetized: videoData.monetized || false,
      revenue: videoData.revenue || 0
    };

    return create('videos', video);
  }

  static async findByIdAndUpdate(id, update) {
    return updateOne('videos', { _id: id }, update);
  }

  static async findByIdAndDelete(id) {
    return deleteOne('videos', { _id: id });
  }

  // Buscar videos con populate
  static async findWithPopulate(query = {}, options = {}) {
    let videos = find('videos', query);
    
    // Ordenar por fecha (más recientes primero) o por vistas
    if (options.sortBy === 'views') {
      videos.sort((a, b) => b.views - a.views);
    } else if (options.sortBy === 'trending') {
      // Algoritmo simple de trending: vistas recientes + likes
      videos.sort((a, b) => {
        const aScore = a.views + (a.likes.length * 10);
        const bScore = b.views + (b.likes.length * 10);
        return bScore - aScore;
      });
    } else {
      videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // Paginación
    if (options.skip) {
      videos = videos.slice(options.skip);
    }
    if (options.limit) {
      videos = videos.slice(0, options.limit);
    }

    // Populate author, likes, comments.author
    return videos.map(video => populate(video, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' },
      { path: 'likes', collection: 'users', select: 'username fullName avatar' },
      { path: 'comments.author', collection: 'users', select: 'username fullName avatar' }
    ]));
  }

  // Buscar videos por canal (usuario)
  static async findByChannel(authorId, options = {}) {
    const videos = find('videos').filter(video => 
      video.author === authorId && video.isPublic
    );
    
    videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    let result = videos;
    if (options.skip) {
      result = result.slice(options.skip);
    }
    if (options.limit) {
      result = result.slice(0, options.limit);
    }

    return result.map(video => populate(video, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' }
    ]));
  }

  // Incrementar vistas
  static async incrementViews(videoId) {
    const video = findOne('videos', { _id: videoId });
    if (video) {
      return updateOne('videos', { _id: videoId }, { views: video.views + 1 });
    }
    return null;
  }

  // Buscar videos por categoría
  static async findByCategory(category, options = {}) {
    const videos = find('videos').filter(video => 
      video.category === category && video.isPublic
    );
    
    videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    let result = videos;
    if (options.limit) {
      result = result.slice(0, options.limit);
    }

    return result.map(video => populate(video, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' }
    ]));
  }

  // Buscar videos trending
  static async findTrending(limit = 20) {
    return this.findWithPopulate({}, { sortBy: 'trending', limit });
  }

  // Buscar videos por tags
  static async searchByTags(tags, limit = 10) {
    const videos = find('videos').filter(video => 
      video.isPublic && video.tags.some(tag => 
        tags.some(searchTag => 
          tag.toLowerCase().includes(searchTag.toLowerCase())
        )
      )
    );

    return videos.slice(0, limit).map(video => populate(video, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' }
    ]));
  }
}

export default Video;