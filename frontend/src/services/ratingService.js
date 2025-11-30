import api from '../config/api';

export const ratingService = {
  async addRating(ratingData) {
    const response = await api.post('/ratings/add/', ratingData);
    return response.data;
  },

  async getMechanicRatings(mechanicId) {
    const response = await api.get(`/ratings/mechanic/${mechanicId}/`);
    return response.data;
  },
};

