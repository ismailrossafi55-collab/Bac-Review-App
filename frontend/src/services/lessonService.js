import api from './api';

const lessonService = {
  getBySubject: async (subjectId) => {
    const response = await api.get(`/lessons/subject/${subjectId}`);
    return response.data;
  },

  create: async (lesson) => {
    const response = await api.post('/lessons', lesson);
    return response.data;
  },

  update: async (id, lesson) => {
    const response = await api.put(`/lessons/${id}`, lesson);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },
};

export default lessonService;
