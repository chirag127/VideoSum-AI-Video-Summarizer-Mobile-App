import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';

/**
 * Format date to readable string
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Extract video ID from YouTube URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const extractVideoId = (url) => {
  if (!url) return null;
  
  // Regular expression to extract video ID
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[7].length === 11) ? match[7] : null;
};

/**
 * Get YouTube thumbnail URL from video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Thumbnail URL
 */
export const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Share text
 * @param {string} text - Text to share
 * @param {string} title - Share dialog title
 * @returns {Promise<boolean>} - Success status
 */
export const shareText = async (text, title = '') => {
  try {
    if (!(await Sharing.isAvailableAsync())) {
      console.log('Sharing is not available on this platform');
      return false;
    }
    
    await Sharing.shareAsync(text, {
      dialogTitle: title,
      mimeType: 'text/plain',
      UTI: 'public.plain-text'
    });
    
    return true;
  } catch (error) {
    console.error('Error sharing text:', error);
    return false;
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate YouTube URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Is valid YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
  if (!url) return false;
  
  // Simple validation
  return (
    url.includes('youtube.com/watch') || 
    url.includes('youtu.be/') ||
    url.includes('youtube.com/v/') ||
    url.includes('youtube.com/embed/')
  );
};
