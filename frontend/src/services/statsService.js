import api from './api';

const statsService = {
  getOverallStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },

  getSubjectStats: async (subjectId) => {
    const response = await api.get(`/stats/subject/${subjectId}`);
    return response.data;
  },

  getTodayProgress: async () => {
    const response = await api.get('/stats/today/progress');
    return response.data;
  },
};

export default statsService;
