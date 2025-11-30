import api from '../config/api';

export const requestService = {
  async createRequest(requestData) {
    const response = await api.post('/requests/create/', requestData);
    return response.data;
  },

  async getCustomerRequests() {
    const response = await api.get('/requests/customer/');
    return response.data;
  },

  async getMechanicRequests() {
    const response = await api.get('/requests/mechanic/');
    return response.data;
  },

  async acceptRequest(requestId) {
    const response = await api.post(`/requests/${requestId}/accept/`);
    return response.data;
  },

  async completeRequest(requestId) {
    const response = await api.post(`/requests/${requestId}/complete/`);
    return response.data;
  },
};

