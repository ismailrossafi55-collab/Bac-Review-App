import api from './api';

const reviewService = {
  submitReview: async (cardId, quality, timeSpent) => {
    const response = await api.post('/reviews', { cardId, quality, timeSpent });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },
};

export default reviewService;
