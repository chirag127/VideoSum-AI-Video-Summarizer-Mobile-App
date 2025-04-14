import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TTS settings keys
const TTS_RATE_KEY = 'tts_rate';
const TTS_PITCH_KEY = 'tts_pitch';
const TTS_VOICE_KEY = 'tts_voice';

// Default TTS settings
const DEFAULT_RATE = 1.0;
const DEFAULT_PITCH = 1.0;

/**
 * TTS Service for handling text-to-speech functionality
 */
class TTSService {
  constructor() {
    this.isSpeaking = false;
    this.currentText = '';
    this.rate = DEFAULT_RATE;
    this.pitch = DEFAULT_PITCH;
    this.voice = null;
    this.voices = [];
    
    // Load saved settings
    this.loadSettings();
    
    // Get available voices
    this.getVoices();
  }
  
  /**
   * Load saved TTS settings from AsyncStorage
   */
  async loadSettings() {
    try {
      const rate = await AsyncStorage.getItem(TTS_RATE_KEY);
      const pitch = await AsyncStorage.getItem(TTS_PITCH_KEY);
      const voice = await AsyncStorage.getItem(TTS_VOICE_KEY);
      
      if (rate) this.rate = parseFloat(rate);
      if (pitch) this.pitch = parseFloat(pitch);
      if (voice) this.voice = voice;
    } catch (error) {
      console.error('Error loading TTS settings:', error);
    }
  }
  
  /**
   * Save TTS settings to AsyncStorage
   */
  async saveSettings() {
    try {
      await AsyncStorage.setItem(TTS_RATE_KEY, this.rate.toString());
      await AsyncStorage.setItem(TTS_PITCH_KEY, this.pitch.toString());
      if (this.voice) {
        await AsyncStorage.setItem(TTS_VOICE_KEY, this.voice);
      }
    } catch (error) {
      console.error('Error saving TTS settings:', error);
    }
  }
  
  /**
   * Get available voices
   */
  async getVoices() {
    try {
      const availableVoices = await Speech.getAvailableVoicesAsync();
      this.voices = availableVoices;
      return availableVoices;
    } catch (error) {
      console.error('Error getting voices:', error);
      return [];
    }
  }
  
  /**
   * Set speech rate
   * @param {number} rate - Speech rate (0.5 to 2.0)
   */
  setRate(rate) {
    this.rate = rate;
    this.saveSettings();
  }
  
  /**
   * Set speech pitch
   * @param {number} pitch - Speech pitch (0.5 to 2.0)
   */
  setPitch(pitch) {
    this.pitch = pitch;
    this.saveSettings();
  }
  
  /**
   * Set voice
   * @param {string} voiceIdentifier - Voice identifier
   */
  setVoice(voiceIdentifier) {
    this.voice = voiceIdentifier;
    this.saveSettings();
  }
  
  /**
   * Speak text
   * @param {string} text - Text to speak
   */
  speak(text) {
    if (!text) return;
    
    this.currentText = text;
    this.isSpeaking = true;
    
    // Stop any ongoing speech
    this.stop();
    
    // Start speaking
    Speech.speak(text, {
      rate: this.rate,
      pitch: this.pitch,
      voice: this.voice,
      onDone: () => {
        this.isSpeaking = false;
      },
      onError: (error) => {
        console.error('Speech error:', error);
        this.isSpeaking = false;
      }
    });
  }
  
  /**
   * Stop speaking
   */
  stop() {
    if (this.isSpeaking) {
      Speech.stop();
      this.isSpeaking = false;
    }
  }
  
  /**
   * Check if speech is in progress
   * @returns {boolean} - True if speaking
   */
  isCurrentlySpeaking() {
    return this.isSpeaking;
  }
  
  /**
   * Get current TTS settings
   * @returns {Object} - Current settings
   */
  getSettings() {
    return {
      rate: this.rate,
      pitch: this.pitch,
      voice: this.voice,
      voices: this.voices
    };
  }
}

// Create a singleton instance
const ttsService = new TTSService();

export default ttsService;
