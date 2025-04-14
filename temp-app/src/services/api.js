import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for summaries
export const summaryApi = {
  // Validate YouTube URL
  validateUrl: async (url) => {
    try {
      const response = await api.post('/summaries/validate', { url });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Generate summary
  generateSummary: async (url, summaryType, summaryLength) => {
    try {
      const response = await api.post('/summaries', {
        url,
        summaryType,
        summaryLength,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Get all summaries
  getAllSummaries: async () => {
    try {
      const response = await api.get('/summaries');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Get summary by ID
  getSummaryById: async (id) => {
    try {
      const response = await api.get(`/summaries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Update summary
  updateSummary: async (id, summaryType, summaryLength) => {
    try {
      const response = await api.put(`/summaries/${id}`, {
        summaryType,
        summaryLength,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Delete summary
  deleteSummary: async (id) => {
    try {
      const response = await api.delete(`/summaries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },
};

export default api;
