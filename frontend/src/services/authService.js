import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register/', userData);
    if (response.data.tokens) {
      await AsyncStorage.setItem('accessToken', response.data.tokens.access);
      await AsyncStorage.setItem('refreshToken', response.data.tokens.refresh);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login/', { email, password });
    if (response.data.tokens) {
      await AsyncStorage.setItem('accessToken', response.data.tokens.access);
      await AsyncStorage.setItem('refreshToken', response.data.tokens.refresh);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me/');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/auth/profile/update/', profileData);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  async logout() {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
  },

  async getUser() {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

