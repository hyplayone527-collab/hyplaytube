import { findOne, find, create, updateOne, deleteOne, populate } from "../database/db.js";

export class Story {
  static async findOne(query) {
    return findOne('stories', query);
  }

  static async find(query = {}) {
    return find('stories', query);
  }

  static async findById(id) {
    return findOne('stories', { _id: id });
  }

  static async create(storyData) {
    const story = {
      ...storyData,
      views: storyData.views || [],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      isActive: true
    };

    return create('stories', story);
  }

  static async findActiveStories() {
    const now = new Date().toISOString();
    const stories = find('stories').filter(story => 
      story.isActive && story.expiresAt > now
    );

    // Agrupar por usuario
    const storiesByUser = {};
    stories.forEach(story => {
      if (!storiesByUser[story.author]) {
        storiesByUser[story.author] = [];
      }
      storiesByUser[story.author].push(story);
    });

    // Populate author info
    return Object.keys(storiesByUser).map(authorId => {
      const userStories = storiesByUser[authorId];
      return {
        author: authorId,
        stories: userStories.map(story => populate(story, [
          { path: 'author', collection: 'users', select: 'username fullName avatar' }
        ])),
        hasUnviewed: userStories.some(story => !story.views.includes(authorId))
      };
    });
  }

  static async addView(storyId, userId) {
    const story = findOne('stories', { _id: storyId });
    if (story && !story.views.includes(userId)) {
      story.views.push(userId);
      return updateOne('stories', { _id: storyId }, { views: story.views });
    }
    return story;
  }

  static async deleteExpiredStories() {
    const now = new Date().toISOString();
    const expiredStories = find('stories').filter(story => story.expiresAt <= now);
    
    expiredStories.forEach(story => {
      deleteOne('stories', { _id: story._id });
    });

    return expiredStories.length;
  }
}

export default Story;