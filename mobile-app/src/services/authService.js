import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

class AuthService {
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
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.token = null;
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    this.token = token;
  }

  async login(email, password) {
    try {
      const response = await this.api.post('/users/login', {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post('/users/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await this.api.get('/users/profile');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userData) {
    try {
      const response = await this.api.put('/users/profile', userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async followUser(userId) {
    try {
      const response = await this.api.put(`/users/${userId}/follow`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async unfollowUser(userId) {
    try {
      const response = await this.api.put(`/users/${userId}/unfollow`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();