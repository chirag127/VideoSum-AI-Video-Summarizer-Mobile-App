import { create } from 'zustand';
import { summaryApi } from '../services/api';

const useSummaryStore = create((set, get) => ({
  // State
  summaries: [],
  currentSummary: null,
  loading: false,
  error: null,
  
  // URL input
  url: '',
  summaryType: 'Brief',
  summaryLength: 'Medium',
  
  // Actions
  setUrl: (url) => set({ url }),
  setSummaryType: (type) => set({ summaryType: type }),
  setSummaryLength: (length) => set({ summaryLength: length }),
  
  // Reset form
  resetForm: () => set({ 
    url: '', 
    summaryType: 'Brief', 
    summaryLength: 'Medium',
    error: null
  }),
  
  // Validate URL
  validateUrl: async (url) => {
    try {
      set({ loading: true, error: null });
      const response = await summaryApi.validateUrl(url);
      set({ loading: false });
      return response;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error validating URL' 
      });
      throw error;
    }
  },
  
  // Generate summary
  generateSummary: async () => {
    const { url, summaryType, summaryLength } = get();
    
    try {
      set({ loading: true, error: null });
      const response = await summaryApi.generateSummary(url, summaryType, summaryLength);
      
      // Add new summary to the list
      set(state => ({ 
        summaries: [response.data, ...state.summaries],
        currentSummary: response.data,
        loading: false 
      }));
      
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error generating summary' 
      });
      throw error;
    }
  },
  
  // Fetch all summaries
  fetchSummaries: async () => {
    try {
      set({ loading: true, error: null });
      const response = await summaryApi.getAllSummaries();
      set({ summaries: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error fetching summaries' 
      });
      throw error;
    }
  },
  
  // Fetch summary by ID
  fetchSummaryById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await summaryApi.getSummaryById(id);
      set({ currentSummary: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error fetching summary' 
      });
      throw error;
    }
  },
  
  // Update summary
  updateSummary: async (id, summaryType, summaryLength) => {
    try {
      set({ loading: true, error: null });
      const response = await summaryApi.updateSummary(id, summaryType, summaryLength);
      
      // Update summaries list and current summary
      set(state => ({
        summaries: state.summaries.map(summary => 
          summary._id === id ? response.data : summary
        ),
        currentSummary: response.data,
        loading: false
      }));
      
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error updating summary' 
      });
      throw error;
    }
  },
  
  // Delete summary
  deleteSummary: async (id) => {
    try {
      set({ loading: true, error: null });
      await summaryApi.deleteSummary(id);
      
      // Remove from summaries list
      set(state => ({
        summaries: state.summaries.filter(summary => summary._id !== id),
        currentSummary: state.currentSummary?._id === id ? null : state.currentSummary,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error deleting summary' 
      });
      throw error;
    }
  },
  
  // Set current summary
  setCurrentSummary: (summary) => set({ currentSummary: summary }),
  
  // Clear current summary
  clearCurrentSummary: () => set({ currentSummary: null }),
  
  // Clear error
  clearError: () => set({ error: null })
}));

export default useSummaryStore;
