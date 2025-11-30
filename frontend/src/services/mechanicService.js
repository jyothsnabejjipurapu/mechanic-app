import api from '../config/api';

export const mechanicService = {
  async getProfile() {
    const response = await api.get('/mechanic/profile/');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.post('/mechanic/profile/update/', profileData);
    return response.data;
  },

  async getNearbyMechanics(lat, lng) {
    const response = await api.get(`/mechanics/nearby/?lat=${lat}&lng=${lng}`);
    return response.data;
  },
};

