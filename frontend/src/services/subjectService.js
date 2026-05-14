import api from './api';

const subjectService = {
  getAll: async () => {
    const response = await api.get('/subjects');
    return response.data;
  },

  create: async (subject) => {
    const response = await api.post('/subjects', subject);
    return response.data;
  },

  update: async (id, subject) => {
    const response = await api.put(`/subjects/${id}`, subject);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/subjects/${id}`);
    return response.data;
  },
};

export default subjectService;
