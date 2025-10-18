import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    this.token = token;
  }

  async getPosts(page = 1, limit = 10) {
    try {
      const response = await this.api.get(`/posts?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId) {
    try {
      const response = await this.api.get(`/posts/${postId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData) {
    try {
      const response = await this.api.post('/posts', postData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async likePost(postId) {
    try {
      const response = await this.api.put(`/posts/${postId}/like`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async commentPost(postId, comment) {
    try {
      const response = await this.api.post(`/posts/${postId}/comment`, {
        content: comment,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getComments(postId) {
    try {
      const response = await this.api.get(`/posts/${postId}/comments`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const response = await this.api.delete(`/posts/${postId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStories() {
    try {
      const response = await this.api.get('/stories');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createStory(storyData) {
    try {
      const response = await this.api.post('/stories', storyData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async viewStory(storyId) {
    try {
      const response = await this.api.put(`/stories/${storyId}/view`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserPosts(userId, page = 1, limit = 10) {
    try {
      const response = await this.api.get(`/users/${userId}/posts?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchPosts(query, page = 1, limit = 10) {
    try {
      const response = await this.api.get(`/posts/search?q=${query}&page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const postService = new PostService();