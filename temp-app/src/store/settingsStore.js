import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ttsService from '../services/ttsService';

// Settings keys
const THEME_KEY = 'theme_mode';

const useSettingsStore = create((set, get) => ({
  // Theme state
  theme: 'light',
  
  // TTS settings
  ttsRate: 1.0,
  ttsPitch: 1.0,
  ttsVoice: null,
  availableVoices: [],
  
  // Initialize settings
  initSettings: async () => {
    try {
      // Load theme
      const theme = await AsyncStorage.getItem(THEME_KEY);
      if (theme) {
        set({ theme });
      }
      
      // Load TTS settings
      const ttsSettings = ttsService.getSettings();
      set({
        ttsRate: ttsSettings.rate,
        ttsPitch: ttsSettings.pitch,
        ttsVoice: ttsSettings.voice,
        availableVoices: ttsSettings.voices
      });
      
      // Load available voices
      const voices = await ttsService.getVoices();
      set({ availableVoices: voices });
    } catch (error) {
      console.error('Error initializing settings:', error);
    }
  },
  
  // Toggle theme
  toggleTheme: async () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
  
  // Set theme
  setTheme: async (theme) => {
    set({ theme });
    
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
  
  // Set TTS rate
  setTTSRate: (rate) => {
    set({ ttsRate: rate });
    ttsService.setRate(rate);
  },
  
  // Set TTS pitch
  setTTSPitch: (pitch) => {
    set({ ttsPitch: pitch });
    ttsService.setPitch(pitch);
  },
  
  // Set TTS voice
  setTTSVoice: (voice) => {
    set({ ttsVoice: voice });
    ttsService.setVoice(voice);
  },
  
  // Load available voices
  loadVoices: async () => {
    try {
      const voices = await ttsService.getVoices();
      set({ availableVoices: voices });
      return voices;
    } catch (error) {
      console.error('Error loading voices:', error);
      return [];
    }
  }
}));

export default useSettingsStore;
