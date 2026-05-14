import api from './api';

const cardService = {
  getByLesson: async (lessonId) => {
    const response = await api.get(`/cards/lesson/${lessonId}`);
    return response.data;
  },

  getDueForReview: async () => {
    const response = await api.get('/cards/review/due');
    return response.data;
  },

  create: async (card) => {
    const response = await api.post('/cards', card);
    return response.data;
  },

  update: async (id, card) => {
    const response = await api.put(`/cards/${id}`, card);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/cards/${id}`);
    return response.data;
  },
};

export default cardService;
